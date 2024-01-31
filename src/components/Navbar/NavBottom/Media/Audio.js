import { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import Player from "./Player"
import _ from "lodash"
import { authorityService } from "../../../../servives/userService"
import { showTypeToastify } from "../../../../servives/toastifyService"

const Audio = ({list, playCurrentSong}) => {
    const audioRef = useRef()
    const didMount = useRef(true)
    const { user } = useSelector(state => state.userInfo)

    const [isPlaying, setIsPlaying] = useState(false)
    const [isMute, setIsMute]= useState(false)
    const [isLoop, setIsLoop] = useState(false)
    const [isRandom, setIsRandom] = useState(false)

    const [randomNum, setRandomNum] = useState([])
    const [progress, setProgress] = useState(0)
    const [volume, setVolume] = useState(80)
    const [currentSong, setCurrentSong] = useState(list[0])

    const handlePlayPrevSong = async () => {
        const len = list.length
        if(len>1){
            let data, cnt = 0

            let index = list.findIndex(item => item.id === currentSong.id);
            do {
                index = index === 0 ? len-1 : index-1
                const song = list.find((item, curIndex)=>curIndex === index)
                data = await authorityService(song.id, user.id)
                if(!data.errorCode && !cnt) {
                    showTypeToastify(data.message, "warning")
                    cnt=1
                }
            } while(!data.errorCode);
            if(randomNum) setRandomNum([])
            setCurrentSong(list[index])
        }
    }
    const handlePlayNextSong = async () => {
        const len = list.length
        if(len>1){
            let data, cnt=0

            let index = list.findIndex(item => item.id === currentSong.id);
            do {
                index = index === len-1 ? 0 : index+1
                const song = list.find((item, curIndex)=>curIndex === index)
                data = await authorityService(song.id, user.id)
                if(!data.errorCode && !cnt) {
                    showTypeToastify(data.message, "warning")
                    cnt=1
                }
            } while(!data.errorCode);
            if(randomNum) setRandomNum([])
            setCurrentSong(list[index])
        }
    }
    const handlePlayRandomSong = async () => {
        const len = list.length
        if(len>1){
            let index, data, cnt=0
            do {
                index = Math.floor(Math.random() * (len-1))

                if(randomNum.length === len) setRandomNum([index])
                else if(!randomNum.includes(index)) setRandomNum(ranNum => [...ranNum, index])
                
                const song = list.find((item, curIndex)=>curIndex === index)
                data = await authorityService(song.id, user.id)
                if(!data.errorCode && !cnt) {
                    showTypeToastify(data.message, "warning")
                    cnt=1
                }
            } while(randomNum.includes(index) || !data.errorCode);

            setCurrentSong(list[index])
        }
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
            if(!didMount.current) {
                audioRef.current.play()
            }
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
        if(session && !_.isEmpty(session)) {
            setCurrentSong(session)
        }
        else setCurrentSong({
            "id": 16,
            "name": "We don't talk anymore",
            "src": "WeDontTalkAnymore",
            "actor": "Charlie Puth",
            "image": "WeDontTalkAnymore",
            "classify": "PREMIUM",
            "video": "3AtDnEC4zak"
        })
    }, [])

    return (
        <div>
            <audio 
                src={
                    require(`../../../../assets/audios/${currentSong && !_.isEmpty(currentSong) && currentSong.src ? currentSong.src : "HayTraoChoAnh"}.mp3`)
                }
                ref={audioRef}
                onPlay={()=>handleOnPlay()}
                onPause={()=>handleOnPause()}
                onEnded={()=>handleOnEnded()}
                onPlaying={()=>handleOnPlaying()}
                onTimeUpdate={()=>handleOnTimeUpdate()}
            />
            {currentSong && !_.isEmpty(currentSong) && <>

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
            /></>
            }
        </div>
    )
}

// require(`../../assets/audios/${currentSong && !_.isEmpty(currentSong) && currentSong.src ? currentSong.src : "HayTraoChoAnh"}.mp3`)

export default Audio