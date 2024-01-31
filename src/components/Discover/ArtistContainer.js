import './ArtistContainer.scss'

import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ArtistContainer = () => {
    const {artists, loading} = useSelector(state => state.artists)
    const navigate = useNavigate()

    const handleScrollLeft = () => {
        const element = document.querySelector(".artists")
        element.scrollLeft -= 140
    }
    const handleScrollRight = () => {
        const element = document.querySelector(".artists")
        element.scrollLeft += 140
    }
    const handleClick = (artistName) => {
        navigate(`/artor/${artistName}`)
    }
    return (
        <div className='artists-container'>
            <h4>Popular Arists</h4>
            <div className='btn-scroll'>
                <div onClick={()=>handleScrollLeft()} className='scroll-icon'><i className="bi bi-arrow-left-circle"></i></div>
                <div onClick={()=>handleScrollRight()} className='scroll-icon'><i className="bi bi-arrow-right-circle"></i></div>
            </div>
            <div className='artists'>
                {!loading && artists?.map((item, index)=>{
                    return (
                        <div key={item.id} className='artist' onClick={()=>handleClick(item.name.split(" ").join("-"))}>
                            <img src={require(`../../assets/images/Artists/${item.image}.jpg`)} alt={item.fakeName} />
                            <p className='artist-name'>{item.name}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ArtistContainer