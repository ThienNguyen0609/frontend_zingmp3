import './Artist.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../configs/axios'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import { setCurrentSong, setCurrentList } from '../../store/features/action/actionSlice'
import { addSongToPlaylist } from '../../servives/playlistService'
import Song from '../Song/Song'

const Artist = () => {
    const {actorName} = useParams()
    const [artistInfo, setArtistInfo] = useState({})
    const dispatch = useDispatch()
    
    const handlePlaySong = (item) => {
        dispatch(setCurrentSong(item));
        dispatch(setCurrentList(artistInfo.songs));
    }
    const handleAddToPlaylist = async (userId, songId) => {
        const mess = await addSongToPlaylist(userId, songId)
        console.log(mess)
    }
    useEffect(()=>{
        const getArtistInfo = async () => {
            const data = await axios.get(`/artist/${actorName}`)
            setArtistInfo(data.artistInfo)
        }

        getArtistInfo()
    }, [actorName])
    return (
        <div className='artist-container'>
            <div className='my-container'>
                {artistInfo && !_.isEmpty(artistInfo) && (<>
                <div className='header-on'></div>
                <div className='header' 
                    style={{
                        backgroundImage: `url(${require(`../../assets/images/Artists/${artistInfo.artistImage}.jpg`)})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className='header-content'>
                    <img src={require(`../../assets/images/Artists/${artistInfo.artistImage}.jpg`)} alt='logo' />
                    <h1 className='artist-name ms-3'>{artistInfo.artistName}</h1>
                    <div className='play-icon ms-3'>
                        <FontAwesomeIcon icon={faPlayCircle} />
                    </div>
                </div>
                <div className='body'>
                    <h1>Top songs</h1>
                </div>
                <div><Song array={artistInfo.songs} loading={false} option="Add to playlist" 
                    icon={faPlusCircle} handleAction={handleAddToPlaylist}
                    handlePlaySong={handlePlaySong} /></div>
                </>)}
            </div>
        </div>
    )
}

// {isHover.is && isHover.id === item.id && <FontAwesomeIcon className='play-icon' icon={faPlay} />}
export default Artist