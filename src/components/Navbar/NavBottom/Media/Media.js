import { useSelector } from "react-redux/es/hooks/useSelector"
import Audio from './Audio';
import _ from "lodash";

const Media = () => {
    const playCurrentSong = useSelector(state=>state.actions)
    const {currentSong, currentSongLoading} = useSelector(state => state.currentSong)

    return (
        <div>
            <Audio list={playCurrentSong.currentList} playCurrentSong={playCurrentSong.currentSong} />
        </div>
    )
}

export default Media