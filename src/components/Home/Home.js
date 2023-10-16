import './Home.scss'

import ArtistContainer from './ArtistContainer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'

const Home = () => {
    const [sliders, setSliders] = useState(initialImage)

    const handlePrev = () => {
        const newSliders = sliders.map((item, index)=>{
            if(index === sliders.length - 1) return sliders[0]
            else return sliders[index+1]
        })
        
        setSliders(newSliders)
    }
    const handleNext = () => {
        const newSliders = sliders.map((item, index)=>{
            if(index === 0) return sliders[sliders.length - 1]
            return sliders[index-1]
        })

        setSliders(newSliders)
    }

    useEffect(()=>{
        const setTime = setTimeout(()=>{
            handleNext()
        }, 4000)

        return () => {
            clearTimeout(setTime)
        }
    }, [sliders])

    return (
        <div className="home-container">
            <div className='my-container'>
                <header className='header'>
                    <div className='arrow-icon arrow-left' onClick={()=>handlePrev()}><FontAwesomeIcon icon={faChevronLeft} /></div>
                    <div className='slider' >
                        <div className={'slider-item ' + sliders[0]}><img src={require("../../assets/images/homeImage/AnhLuonNhuVay.jpg")} alt="picture0" /></div>
                        <div className={'slider-item ' + sliders[1]}><img src={require("../../assets/images/homeImage/ChaiDiepNoong.jpg")} alt="picture1" /></div>
                        <div className={'slider-item ' + sliders[2]}><img src={require("../../assets/images/homeImage/CoEmLaDieuTuyetVoi.jpg")} alt="picture2" /></div>
                        <div className={'slider-item ' + sliders[3]}><img src={require("../../assets/images/homeImage/MeHieuConKhong.jpg")} alt="picture3" /></div>
                        <div className={'slider-item ' + sliders[4]}><img src={require("../../assets/images/homeImage/NoiAnhNghe.jpg")} alt="picture4" /></div>
                    </div>
                    <div className='arrow-icon arrow-right' onClick={()=>handleNext()}><FontAwesomeIcon icon={faChevronRight} /></div>
                </header>
                <div className='body'>
                    <ArtistContainer />
                </div>
            </div>
        </div>
    )
}
// {sliders && sliders.map((item, index)=>{
//     if(index === 0 || index === 1 || index === 2) {
//         return (
//             <div key={item.name} className='slider-item active'><img src={item.src} alt={item.name} /></div>
//         )
//     }
//     else {
//         return (
//             <div key={item.name} className='slider-item'><img src={item.src} alt={item.name} /></div>
//         )
//     }
// })}
const initialImage = [
    "left-item",
    "center-item",
    "right-item",
    "next-item",
    "last-item"
]

export default Home