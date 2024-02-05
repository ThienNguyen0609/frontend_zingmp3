import './Video.scss'

import { useSearchParams, useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Video = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isClose, setIsClose] = useState(false)
    const {state} = useLocation()
    const navigate = useNavigate()

    console.log(state)

    const video = searchParams.get('v');

    return (
        <div className={`video-container ${isClose && "hide-video-container"}`}>
            <div className='video-bg'>
                <div className='bg'
                    style={{
                        backgroundImage: `url(${require(`../../../../assets/images/Albums/${state.image}.jpg`)})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top center'
                    }}
                ></div>
                <div className='bg-on'></div>
            </div>
            <div className='video-all'>
                <div className='video-header'>
                    <div className='close' 
                        onClick={()=>{
                            setIsClose(!isClose)
                            setTimeout(()=>{
                                navigate(-1)
                            }, 500)
                        }
                    }>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
                <div className='video-body'>
                    <div className='video'>
                        <iframe 
                            src={`https://www.youtube.com/embed/${video}?autoplay=1`} 
                            frameBorder="0" allow='autoplay' allowFullScreen={true}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video