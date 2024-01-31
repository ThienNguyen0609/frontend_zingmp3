import './Video.scss'

import { useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Video = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isClose, setIsClose] = useState(false)
    const navigate = useNavigate()

    const video = searchParams.get('v');

    return (
        <div className={isClose ? 'video-container hide-video-container' : 'video-container'}>
            <div className='video-bg'>
                <img src={`https://i.ytimg.com/vi/${video}/hqdefault.jpg`} alt='ok' />
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
                            frameborder="0" allow='autoplay' allowFullScreen={true}
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Video