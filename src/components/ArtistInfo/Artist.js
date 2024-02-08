import './Artist.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from '../../configs/axios'
import _ from 'lodash'
import Song from '../Song/Song'

const Artist = () => {
    const {actorName} = useParams()
    const [artist, setArtistInfo] = useState({})
    const [songs, setSongs] = useState([])

    useEffect(()=>{
        const getArtistInfo = async () => {
            const response = await axios.get(`/artist/${actorName}`)
            setArtistInfo(response.artist)
            setSongs(response.songs)
        }

        getArtistInfo()
    }, [actorName])
    return (
        <div className='component-container'>
            <div className='my-container'>
                {artist && !_.isEmpty(artist) && (<>
                <div className='header-on'></div>
                <div className='artist-header' 
                    style={{
                        backgroundImage: `url(${require(`../../assets/images/Artists/${artist.image}.jpg`)})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                    }}
                ></div>
                <div className='header-content'>
                    <img src={require(`../../assets/images/Artists/${artist.image}.jpg`)} alt='logo' />
                    <h1 className='artist-name ms-3'>{artist.name}</h1>
                    <div className='play-icon ms-3'>
                        <FontAwesomeIcon icon={faPlayCircle} />
                    </div>
                </div>
                <div className='body'>
                    <h1>Top songs</h1>
                </div>
                <div><Song array={songs} loading={false} option="Add to playlist" isPlaylist={false}
                    icon={faPlusCircle} /></div>
                </>)}
            </div>
        </div>
    )
}

// {isHover.is && isHover.id === item.id && <FontAwesomeIcon className='play-icon' icon={faPlay} />}
export default Artist