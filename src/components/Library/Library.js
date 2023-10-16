import './Library.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentSong } from '../../store/features/action/actionSlice'

const Library = () => {
    const {songs, loading} = useSelector(state => state.songs)
    const [activeNo, setActiveNo] = useState(0)
    const [isHover, setIsHover] = useState({
        is: false,
        id: 0
    })
    const dispatch = useDispatch()

    const handleSetActive = (No) => {
        setActiveNo(No)
    }

    const handleMouseOver = (id) => {
        setIsHover({
            is: true,
            id: id
        })
    }
    const handleMouseOut = () => {
        setIsHover({
            is: false,
            id: 0
        })
    }
    return (
        <>
        <div className='library-container'>
            <div className='my-container'>
                <div className='library-content'>
                    <h1>Library <span className='play-icon'><FontAwesomeIcon icon={faPlayCircle} /></span>
                    </h1>
                </div>

                <div className='library-nav'>
                    <div 
                        className={activeNo === 0 ? 'library-nav-item h6 active' : 'library-nav-item h6'}
                        onClick={()=>handleSetActive(0)}
                    >Song</div>
                    <div 
                        className={activeNo === 1 ? 'library-nav-item h6 active' : 'library-nav-item h6'}
                        onClick={()=>handleSetActive(1)}
                    >PODCAST</div>
                    <div 
                        className={activeNo === 2 ? 'library-nav-item h6 active' : 'library-nav-item h6'}
                        onClick={()=>handleSetActive(2)}
                    >MV</div>
                </div>

                <div className='library-list'>
                    <table>
                        <thead className='header-list heigth bd-bottom'>
                            <tr>
                                <th>Song</th>
                                <th className='text-center'>Classify</th>
                                <th className='text-center'>Time</th>
                            </tr>
                        </thead>
                        <tbody className='body-list'>
                            {!loading && songs.map((item, index)=>{
                                return (
                                    <tr key={item.id} className='song-item heigth bd-bottom'>
                                        <td className='song-item-image'>
                                            <div className='song-image'
                                                onMouseOver={()=>handleMouseOver(item.id)} 
                                                onMouseOut={()=>handleMouseOut()}
                                                onClick={()=>{
                                                    localStorage.setItem("currentSong", JSON.stringify(item));
                                                    dispatch(setCurrentSong(item))
                                                }}
                                            >
                                                {isHover.is && isHover.id === item.id && <FontAwesomeIcon className='play-icon' icon={faPlay} />}
                                                <img
                                                    src={require(`../../assets/images/${item.image}.png`)} 
                                                    alt='Logo' className='image'
                                                />
                                            </div>
                                            <div className='song-info'>
                                                <p className='info-name'>{item.name}</p>
                                                <p className='info-actor'>{item.actor}</p>
                                            </div>
                                        </td>
                                        <td className='text-center'><span className={item.classify === "BASIC" ? "basic classify" : "premium classify"}>{item.classify}</span></td>
                                        <td className='text-center'>4:40</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
}

export default Library