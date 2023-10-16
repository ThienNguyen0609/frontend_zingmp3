import './Controls.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faRandom,
    faPlayCircle, 
    faPauseCircle, 
    faStepForward, 
    faStepBackward,
    faSyncAlt
} from '@fortawesome/free-solid-svg-icons'

const Controls = ({
    audioRef,
    handlePlayPrevSong, handlePlayNextSong,
    isPlaying, 
    isLoop, setIsLoop, 
    isRandom, setIsRandom
}) => {
    const handlePauseAudio = () => {
        audioRef.current.pause()
    }
    const handlePlayAudio = () => {
        audioRef.current.play()
    }
    const handleLoopAudio = () => {
        setIsLoop(!isLoop)
        if(isRandom) setIsRandom(!isRandom)
    }
    const handleRandomAudio = () => {
        setIsRandom(!isRandom)
        if(isLoop) setIsLoop(!isLoop)
    }

    return (
        <div className='controls'>
            <div 
                className={isRandom ? "active icon-size-small icon-control" : "icon-size-small icon-control"}
                onClick={()=>handleRandomAudio()}
            >
                <FontAwesomeIcon icon={faRandom} />
            </div>
            <div className="icon-size-small icon-control" onClick={()=>handlePlayPrevSong()}>
                <FontAwesomeIcon icon={faStepBackward} />
            </div>
            <div className='icon-size-big icon-control'>
                {isPlaying ? 
                    <FontAwesomeIcon icon={faPauseCircle} onClick={()=>handlePauseAudio()} /> :
                    <FontAwesomeIcon icon={faPlayCircle} onClick={()=>handlePlayAudio()} />
                }
            </div>
            <div className="icon-size-small icon-control" onClick={()=>handlePlayNextSong()}>
                <FontAwesomeIcon icon={faStepForward} />
            </div>
            <div 
                className={isLoop ? "active icon-size-small icon-control" : "icon-size-small icon-control"}
                onClick={()=>handleLoopAudio()}
            >
                <FontAwesomeIcon icon={faSyncAlt} />
            </div>
        </div>
    )
}
// className={props.isActive.loop ? "active icon-size-small icon-control" : "icon-size-small icon-control"}



export default Controls