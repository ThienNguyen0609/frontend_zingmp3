import './Playlist.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import CreatePlaylistModal from './CreatePlaylistModal/CreatePlaylistModal'
import { useSelector } from 'react-redux'
import PlaylistItem from './PlaylistItem/PlaylistItem'
import _ from 'lodash'
import DeletePlaylistModal from './DeletePlaylistModal/DeletePlaylistModal'

const Playlist = () => {
    const {playlist, playlistLoading} = useSelector(state => state.playlist)
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [playlistId, setPlaylistId] = useState(0)
    return (
        <div className='component-container'>
            <CreatePlaylistModal showModal={showCreateModal} setShowModal={setShowCreateModal} />
            <DeletePlaylistModal showModal={showDeleteModal} setShowModal={setShowDeleteModal} playlistId={playlistId} />
            <div className='my-container'>
                <div className='playlist-content'>
                    <h1>Playlist <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span></h1>
                </div>
                <div className='playlist mt-4'>
                    <div className='add-playlist column' onClick={()=>setShowCreateModal(true)}>
                        <div className='text-center'>
                            <FontAwesomeIcon icon={faPlusCircle} />
                            <h4>Create playlist</h4>
                        </div>
                    </div>
                    {!playlistLoading && playlist && !_.isEmpty(playlist) && playlist.map((item) => {
                        return (
                            <PlaylistItem key={item.id} playlistItem={item} setShowDeleteModal={setShowDeleteModal} setPlaylistId={setPlaylistId} />
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