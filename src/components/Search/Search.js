import './Search.scss'

import Song from '../Song/Song'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { showTypeToastify } from '../../servives/toastifyService';
import { getMyPlaylist } from '../../store/features/playlist/playlistSlice'
import axios from '../../configs/axios'
import { addSongToPlaylist } from '../../servives/playlistService'
import _ from 'lodash'

const Search = () => {
    const [searchParams] = useSearchParams()
    const [songs, setSongs] = useState([])
    const dispatch = useDispatch();

    const handleAddToPlaylist = async (userId, songId) => {
        const data = await addSongToPlaylist(userId, songId)
        if(data.errorCode) showTypeToastify(data.message, "success")
        else showTypeToastify(data.message, "warning")
        dispatch(getMyPlaylist(userId))
    }

    useEffect(()=>{
        const findAllSong = async () => {
            const data = await axios.post(`/search/all`, {search: searchParams.get("q")})
            console.log(data)
            setSongs(data)
        }

        findAllSong()
    }, [searchParams.get("q")])
    return (
        <div className='search-container'>
            <div className='my-container'>
                <div className='search-header'>
                    <h1>Search "{searchParams.get("q")}" <span className='play-icon'><FontAwesomeIcon icon={faSearch} /></span></h1>
                </div>
                {songs && !_.isEmpty(songs) && (
                <div>
                    <Song array={songs} loading={false} option="Add to playlist" isPlaylist={false}
                    icon={faPlusCircle} handleAction={handleAddToPlaylist} />
                </div>
                )}
            </div>
        </div>
    )
}

export default Search