import './Library.scss'

import Song from '../Song/Song'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from "react-redux";

const Library = () => {
    const {songs, loading} = useSelector(state => state.songs)
    return (
        <>
        <div className='component-container'>
            <div className='my-container position-relative'>
                <div className='library-content'>
                    <h1>Library <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span></h1>
                </div>
                <div>
                    <Song array={songs} loading={loading} option="Add to playlist" isPlaylist={false}
                    icon={faPlusCircle}
                /></div>
            </div>
        </div>
        </>
    )
}

export default Library