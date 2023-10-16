import './ArtistContainer.scss'

import { useDispatch, useSelector } from 'react-redux'
import { setArtistId } from '../../store/features/action/actionSlice'
import { useNavigate } from 'react-router-dom'

const ArtistContainer = () => {
    const {artists, loading} = useSelector(state => state.artists)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleScrollLeft = () => {
        const element = document.querySelector(".artists")
        element.scrollLeft -= 140
    }
    const handleScrollRight = () => {
        const element = document.querySelector(".artists")
        element.scrollLeft += 140
    }
    const handleGetArtistId = (artistId) => {
        dispatch(setArtistId(artistId))
        navigate(`/artist?id=${artistId}`)
    }
    return (
        <div className='artists-container'>
            <h4>Popular Arists</h4>
            <div className='btn-scroll'>
                <div onClick={()=>handleScrollLeft()} className='scroll-icon'><i className="bi bi-arrow-left-circle"></i></div>
                <div onClick={()=>handleScrollRight()} className='scroll-icon'><i className="bi bi-arrow-right-circle"></i></div>
            </div>
            <div className='artists'>
                {!loading && artists?.artists?.map((item, index)=>{
                    return (
                        <div key={item.id} className='artist' onClick={()=>handleGetArtistId(item.id)}>
                            <img src={item.images[2].url} alt={item.name} />
                            <p className='artist-name'>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ArtistContainer