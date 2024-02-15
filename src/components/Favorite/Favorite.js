import Song from '../Song/Song'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getFavoriteSong } from '../../store/features/songs/favoriteSongSlice'
import _ from 'lodash'

const Favorite = () => {
    const { user } = useSelector(state => state.user)
    const { favoriteSong, favoriteSongLoading } = useSelector(state => state.favoriteSong)
    const dispatch = useDispatch()

    console.log(favoriteSong)

    useEffect(() => {
        dispatch(getFavoriteSong(user.id))
    }, [])
    return (
        <div className="component-container">
            <div className="my-container favorite-container">
                <div className="favorite-title">
                    <h1>Favortie <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span></h1>
                </div>
                <div className='favorite-content'>
                    <Song array={favoriteSong} loading={favoriteSongLoading} option="Add to playlist" isPlaylist={false}
                    icon={faPlusCircle} />
                </div>
            </div>
        </div>
    )
}

export default Favorite