import './Player.scss'
import { useRef } from 'react'
import Controls from './Controls'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faMusic, faVolumeUp, faVolumeMute, faEllipsisH, faPlus, faVideo } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import _ from "lodash"


const Player = (props) => {
    const progressRef = useRef()
    const volumeRef = useRef()
    const dragging = useRef(false)
    const navigate = useNavigate()

    const currentSong = props.currentSong
    const audioRef = props.audioRef
    const progress = props.progress
    const volume = props.volume

    document.body.addEventListener('mouseup', e => {
        dragging.current = false
    })
    document.body.addEventListener('mousemove', e => {
        e.preventDefault();
        if(dragging.current) {
            let width = e.clientX - volumeRef.current.offsetLeft
            const offsetWidth = volumeRef.current.offsetWidth

            if(width <= 0) width = 0
            else if(width >= offsetWidth) width = offsetWidth

            const percentVolume = width / offsetWidth * 100
            audioRef.current.volume = percentVolume / 100
            props.setVolume(percentVolume)
        }
    })

    const handleSetProgress = (e) => {
        const offsetWidth = progressRef.current.offsetWidth
        const duration = audioRef.current.duration

        const percentProgress = e.nativeEvent.offsetX / offsetWidth * 100
        audioRef.current.currentTime = percentProgress / 100 * duration

        props.setProgress(percentProgress)
    }
    
    const handleOnMouseDown = (e) => {
        dragging.current = true
        const offsetWidth = volumeRef.current.offsetWidth
        const percentVolume = e.nativeEvent.offsetX / offsetWidth * 100
        audioRef.current.volume = percentVolume / 100
        props.setVolume(percentVolume)
    }
    const handlePlayVideo = () => {
        if(!audioRef.current.paused) audioRef.current.pause()
        navigate(`video-clip/watch?v=${currentSong.video}`)
    }

    return (
        <>
        <div className='player-container'>
            <div className='title w-25'>
                <div className='song-image'>
                    <img
                        src={require(`../../assets/images/${currentSong && !_.isEmpty(currentSong) && currentSong.image ? currentSong.image : "HayTraoChoAnh"}.png`)} 
                        alt='Logo' className='image'
                    />
                </div>
                <div className='song-info'>
                    <p className='info-name'>{currentSong.name}</p>
                    <p className='info-actor'>{currentSong.actor}</p>
                </div>
                <div className={'like-icon'}>
                    <FontAwesomeIcon icon={faHeart} />
                </div>
            </div>
            <div className='controller'>
                <Controls 
                    audioRef={audioRef} 
                    handlePlayPrevSong={props.handlePlayPrevSong}
                    handlePlayNextSong={props.handlePlayNextSong}
                    isPlaying={props.isPlaying} 
                    setIsPlaying={props.setIsPlaying}
                    isLoop={props.isLoop}
                    setIsLoop={props.setIsLoop}
                    isRandom={props.isRandom}
                    setIsRandom={props.setIsRandom}
                />
                <div className='navigation'>
                    <div className='navigation-wrapper' ref={progressRef} onMouseDown={(e)=>handleSetProgress(e)}>
                        <div className='seek-bar' style={{width: `${progress}%`}}></div>
                    </div>
                </div>
            </div>
            <div className='option w-25'>
                {currentSong && !_.isEmpty(currentSong) && currentSong.video !== 'NULL' ? 
                    <div 
                        onClick={()=>handlePlayVideo()}
                        className='icon ms-3'
                    >
                        <FontAwesomeIcon icon={faVideo} />
                    </div> :
                    <div className='icon ms-3 no-drop'>
                        <FontAwesomeIcon icon={faVideo} />
                    </div>
                }
                <div className='icon ms-3'><FontAwesomeIcon icon={faMusic} /></div>
                <div className='icon ms-3'><FontAwesomeIcon icon={faPlus} /></div>
                <div className='volume ms-3'>
                    <div className='icon'>
                        {props.isMute ?
                        <FontAwesomeIcon icon={faVolumeMute} onClick={()=>props.setIsMute(!props.isMute)} /> :
                        <FontAwesomeIcon icon={faVolumeUp} onClick={()=>props.setIsMute(!props.isMute)} />
                        }
                    </div>
                    <div className='set-volume' ref={volumeRef}>
                        <div className='volume-wrapper'>
                            <div className='volume-seek-bar' style={{width: `${volume}%`}}></div>
                        </div>
                        <div 
                            className='hide-volume-wrapper'
                            onMouseDown={(e)=>handleOnMouseDown(e)}
                        ></div>
                    </div>
                </div>
                <div className='icon ms-3'><FontAwesomeIcon icon={faEllipsisH} /></div>
            </div>
        </div>
        </>
    )
}
// props.isLove ? 'like-icon like-icon-color' :
export default Player