import './Artist.scss'

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlay } from '@fortawesome/free-solid-svg-icons'
import { getArtistAlbums } from '../../store/features/artistAlbums/artistAlbumsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

const Artist = () => {
    const artistId = useSelector(state => state.actions)
    const {tracks, loading} = useSelector(state => state.artistAlbums)
    const dispatch = useDispatch()

    if(!loading) console.log(tracks)

    useEffect(()=>{
        dispatch(getArtistAlbums(artistId.artistId))
    }, [])

    return (
        <div className='artist-container'>
            <div className='my-container'>
                <table>
                    <thead className='header-list heigth bd-bottom'>
                        <tr>
                            <th>Song</th>
                            <th className='text-center'>Classify</th>
                            <th className='text-center'>Time</th>
                        </tr>
                    </thead>
                    <tbody className='body-list'>
                        {!loading && tracks?.items?.map((item, index)=>{
                            return (
                                <tr key={item.id} className='song-item heigth bd-bottom'>
                                    <td className='song-item-image'>
                                        <div className='song-image'>
                                            <img
                                                src={item.images[2].url} 
                                                alt='Logo' className='image'
                                            />
                                        </div>
                                        <div className='song-info'>
                                            <p className='info-name'>{item.name}</p>
                                            <p className='info-actor'>{item.artists[0].name}</p>
                                        </div>
                                    </td>
                                    <td className='text-center'><span className={"premium classify"}>{item.type}</span></td>
                                    <td className='text-center'>4:40</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

// {isHover.is && isHover.id === item.id && <FontAwesomeIcon className='play-icon' icon={faPlay} />}
export default Artist