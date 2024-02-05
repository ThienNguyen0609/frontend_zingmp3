import './Playlist.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import CreatePlaylistModal from './CreatePlaylistModal/CreatePlaylistModal'
import { useSelector } from 'react-redux'
import PlaylistItem from './PlaylistItem/PlaylistItem'
import _ from 'lodash'

const Playlist = () => {
    const {playlist, playlistLoading} = useSelector(state => state.playlist)
    const [showModal, setShowModal] = useState(false)
    console.log(playlist)
    return (
        <div className='component-container'>
            {showModal && (
                <CreatePlaylistModal showModal={showModal} setShowModal={setShowModal} />
            )}
            <div className='my-container'>
                <div className='playlist-content'>
                    <h1>Playlist <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span></h1>
                </div>
                <div className='playlist mt-4'>
                    <div className='add-playlist column' onClick={()=>setShowModal(true)}>
                        <div className='text-center'>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <h4>Create playlist</h4>
                        </div>
                    </div>
                    {!playlistLoading && playlist && !_.isEmpty(playlist) && playlist.map((item) => {
                        return (
                            <PlaylistItem key={item.id} playlistItem={item} />
                        )
                    })}
                    <div className='column'></div>
                    <div className='column'></div>
                </div>
            </div>
        </div>
    )
}

export default Playlist