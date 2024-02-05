import './Search.scss'

import Song from '../Song/Song'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../configs/axios'
import _ from 'lodash'

const Search = () => {
    const [searchParams] = useSearchParams()
    const [songs, setSongs] = useState([])
    useEffect(()=>{
        const findAllSong = async () => {
            const data = await axios.post(`/search/all`, {search: searchParams.get("q")})
            setSongs(data)
        }
        findAllSong()
    }, [searchParams.get("q")])
    return (
        <div className='component-container'>
            <div className='my-container'>
                <div className='search-header'>
                    <h1>Search "{searchParams.get("q")}" <span className='play-icon'><FontAwesomeIcon icon={faSearch} /></span></h1>
                </div>
                {songs && !_.isEmpty(songs) && (
                <div>
                    <Song array={songs} loading={false} option="Add to playlist" 
                    isPlaylist={false} icon={faPlusCircle} />
                </div>
                )}
            </div>
        </div>
    )
}

export default Search