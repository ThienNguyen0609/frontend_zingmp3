import { useEffect, useRef, useState } from "react"
import Player from "./Player"
import _ from "lodash"

const Audio = ({songs, playCurrentSong}) => {
    const audioRef = useRef()
    const didMount = useRef(true)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMute, setIsMute]= useState(false)
    const [isLoop, setIsLoop] = useState(false)
    const [isRandom, setIsRandom] = useState(false)

    const [randomNum, setRandomNum] = useState([])
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(80)
    const [currentSong, setCurrentSong] = useState(songs[0])

    const handlePlayPrevSong = () => {
        const len = songs.length
        const index = songs.findIndex(item => item.id === currentSong.id);
        index === 0 ? setCurrentSong(songs[len-1]) : setCurrentSong(songs[index-1])
    }
    const handlePlayNextSong = () => {
        const len = songs.length
        const index = songs.findIndex(item => item.id === currentSong.id);
        index === len-1 ? setCurrentSong(songs[0]) : setCurrentSong(songs[index+1])
    }
    const handlePlayRandomSong = () => {
        const len = songs.length
        let index
        do {
            index = Math.floor(Math.random() * (len-1))
        } while(randomNum.includes(index));

        if(randomNum.length === len) setRandomNum([index])
        else setRandomNum([...randomNum, index])

        setCurrentSong(songs[index])
    }

    const handleOnPlay = () => {
        setIsPlaying(true)
    }
    const handleOnPause = () => {
        setIsPlaying(false)
    }
    const handleOnEnded = () => {
        setIsPlaying(false)
        setTimeout(() => {
            if(isLoop) audioRef.current.play()
            else if(isRandom) handlePlayRandomSong()
            else handlePlayNextSong()
        }, 500);
    }
    const handleOnTimeUpdate = () => {
        const duration = audioRef.current.duration
        if(duration) {
            const propgressPercent = audioRef.current.currentTime / duration * 100
            setProgress(propgressPercent)
        }
    }
    const handleOnPlaying = () => {
        localStorage.setItem("currentSong", JSON.stringify(currentSong))
    }

    useEffect(()=>{
        audioRef.current.muted = isMute ? true : false
    }, [isMute])
    useEffect(()=>{
        volume === 0 ? setIsMute(true) : setIsMute(false)
    }, [volume])
    useEffect(()=>{
        setProgress(0)
        const setTime = setTimeout(()=>{
            if(!didMount.current) audioRef.current.play()
            didMount.current = false
        }, 1000)
        return () => {
            clearTimeout(setTime)
        }
    }, [currentSong])

    useEffect(()=>{
        if(playCurrentSong && !_.isEmpty(playCurrentSong)) setCurrentSong(playCurrentSong)
    }, [playCurrentSong])

    useEffect(()=>{
        const session = JSON.parse(localStorage.getItem("currentSong"))
        if(session) {
            setCurrentSong(session)
        }
    }, [])

    return (
        <div>
            <audio 
                src={
                    require(`../../assets/audios/${currentSong && !_.isEmpty(currentSong) && currentSong.src ? currentSong.src : "HayTraoChoAnh"}.mp3`)
                }
                ref={audioRef}
                onPlay={()=>handleOnPlay()}
                onPause={()=>handleOnPause()}
                onEnded={()=>handleOnEnded()}
                onPlaying={()=>handleOnPlaying()}
                onTimeUpdate={()=>handleOnTimeUpdate()}
            />
            {currentSong && !_.isEmpty(currentSong) && 
            <Player 
                currentSong={currentSong}
                progress={progress}
                setProgress={setProgress}
                volume={volume}
                setVolume={setVolume}
                handlePlayPrevSong={handlePlayPrevSong}
                handlePlayNextSong={handlePlayNextSong}
                audioRef={audioRef}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                isMute={isMute}
                setIsMute={setIsMute}
                isLoop={isLoop}
                setIsLoop={setIsLoop}
                isRandom={isRandom}
                setIsRandom={setIsRandom}
            />
            }
        </div>
    )
}

// require(`../../assets/audios/${currentSong && !_.isEmpty(currentSong) && currentSong.src ? currentSong.src : "HayTraoChoAnh"}.mp3`)

export default Audio