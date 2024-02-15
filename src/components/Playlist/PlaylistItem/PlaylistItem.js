import './PlaylistItem.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'

const PlaylistItem = (props) => {
    const navigate = useNavigate()
    return (
        <div className='playlist-item'>
            <div className='playlist-item-image'>
                <div className='playlist-item-on'>
                    <FontAwesomeIcon className='playlist-icon-play' icon={faPlayCircle}
                    onClick={() => navigate(`/playlist/${props.playlistItem.namePlaylist.split(" ").join("_")}`, {state: {playlistId: props.playlistItem.id, playlistName: props.playlistItem.namePlaylist}})} />
                </div>
                <div className='playlist-icon-close' onClick={()=>{
                    props.setPlaylistId(props.playlistItem.id)
                    props.setShowDeleteModal(true)
                }}>
                    <FontAwesomeIcon icon={faTimes} />
                </div>
                <img src={require("../../../assets/images/discover_page/playlist.png")} alt='logo' />
            </div>
            <div className='playlist-item-content'>
                <h6>{props.playlistItem.namePlaylist}</h6>
            </div>
        </div>
    )
}

export default PlaylistItem