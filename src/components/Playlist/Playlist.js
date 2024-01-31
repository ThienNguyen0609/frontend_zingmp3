import './Playlist.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import Song from '../Song/Song'
import { useState } from 'react'
import { removeFromPlaylist } from '../../servives/playlistService'
import { getMyPlaylist } from '../../store/features/playlist/playlistSlice'
import { showTypeToastify } from '../../servives/toastifyService';

const Playlist = () => {
    const {myPlaylist, loading} = useSelector(state => state.myPlaylist)
    const dispatch = useDispatch()
    const [playlist, setPlaylist] = useState(myPlaylist)

    const handleRemoveFromPlaylist = async (userId, songId) => {
        const data = await removeFromPlaylist(userId, songId)
        setPlaylist(playlist.filter(item => item.id !== songId))
        if(data.errorCode) showTypeToastify(data.message, "success")
        else showTypeToastify(data.message, "warning")
        dispatch(getMyPlaylist(userId))
    }
    return (
        <div className='playlist-container'>
            <div className='my-container'>
                <div className='playlist-content'>
                    <h1>Playlist <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span></h1>
                </div>
                <div>
                    <Song 
                        array={playlist} loading={loading} option="Remove from this playlist" isPlaylist={true}
                        icon={faTrash} handleAction={handleRemoveFromPlaylist}
                    />
                </div>
            </div>
        </div>
    )
}

export default Playlist