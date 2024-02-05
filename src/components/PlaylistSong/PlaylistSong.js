import './PlaylistSong.scss'

import Song from '../Song/Song'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { getPlaylistSong } from '../../servives/playlistService';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const PlaylistSong = () => {
    const { user } = useSelector((state) => state.user);
    const {state} = useLocation()

    const [playlistSong, setPlaylistSong] = useState([])

    const handleRemoveItem = (songId) => {
        setPlaylistSong(playlistSong.filter(item => item.id !== songId))
    }

    useEffect(() => {
        const handleGetPlaylistSong = async (playlistId) => {
            const response = await getPlaylistSong(playlistId, user.id)
            setPlaylistSong(response.songs)
        }

        handleGetPlaylistSong(state.playlistId)
    }, [])
    return (
        <div className='component-container'>
            <div className='my-container'>
                <div className='playlist-content'>
                    <h1>{state.playlistName} <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span></h1>
                </div>
                <div>
                    <Song array={playlistSong} loading={false} option="Remove from playlist" isPlaylist={true}
                    icon={faPlusCircle} playlistId={state.playlistId} handleRemoveItem={handleRemoveItem}
                /></div>
            </div>
        </div>
    )
}

export default PlaylistSong