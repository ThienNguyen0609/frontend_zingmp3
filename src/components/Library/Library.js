import './Library.scss'

import Song from '../Song/Song'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux";
import { addSongToPlaylist } from '../../servives/playlistService';
import { getMyPlaylist } from '../../store/features/playlist/playlistSlice';
import { showTypeToastify } from '../../servives/toastifyService';

const Library = () => {
    const {songs, loading} = useSelector(state => state.songs)
    const dispatch = useDispatch();

    const handleAddToPlaylist = async (userId, songId) => {
        const data = await addSongToPlaylist(userId, songId)
        if(data.errorCode) showTypeToastify(data.message, "success")
        else showTypeToastify(data.message, "warning")
        dispatch(getMyPlaylist(userId))
    }
    return (
        <>
        <div className='library-container'>
            <div className='my-container position-relative'>
                <div className='library-content'>
                    <h1>Library <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span></h1>
                </div>
                <div>
                    <Song array={songs} loading={loading} option="Add to playlist" isPlaylist={false}
                    icon={faPlusCircle} handleAction={handleAddToPlaylist}
                /></div>
            </div>
        </div>
        </>
    )
}

export default Library