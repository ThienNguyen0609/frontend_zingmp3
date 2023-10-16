import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from "react-redux/es/hooks/useSelector"
import Audio from './Audio';

const Media = () => {
    const {songs, loading} = useSelector(state => state.songs)
    const playCurrentSong = useSelector(state=>state.actions)

    return (
        <div>
            {loading ? 
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> :
                <Audio songs={songs} playCurrentSong={playCurrentSong.currentSong} />
            }
        </div>
    )
}

export default Media