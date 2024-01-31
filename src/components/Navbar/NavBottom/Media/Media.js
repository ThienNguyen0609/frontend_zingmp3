import { useSelector } from "react-redux/es/hooks/useSelector"
import Audio from './Audio';

const Media = () => {
    const playCurrentSong = useSelector(state=>state.actions)

    return (
        <div>
            <Audio list={playCurrentSong.currentList} playCurrentSong={playCurrentSong.currentSong} />
        </div>
    )
}

export default Media