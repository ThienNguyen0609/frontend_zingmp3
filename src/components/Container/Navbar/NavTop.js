import './NavTop.scss'

import UserInfo from './UserInfo';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';

const NavTop = () => {
    const navigate = useNavigate()
    const [search, setSearch] = useState('')
    const [isShowInfoUser, setIsShowInfoUser] = useState(false)
    
    const handleSearchElement = (value) => {
        setSearch(value)
    }
    const handleShowInfoUser = (e) =>{
        setIsShowInfoUser(!isShowInfoUser)
    }
    return (
        <div className='search-container'>
            <div className='my-container navbar-search'>
                <div className='navigate-search input-container'>
                    <div className='navigate'>
                        <FontAwesomeIcon onClick={()=>navigate(-1)} icon={faArrowLeft} /> 
                        <FontAwesomeIcon onClick={()=>navigate(1)} icon={faArrowRight} />
                    </div>
                    <input 
                        type='text' className='search-input' value={search}
                        placeholder='What do you want to listen to?'
                        onChange={(e)=>handleSearchElement(e.target.value)}
                    />
                    <FontAwesomeIcon className='search-icon' icon={faSearch} />
                </div>
                <div onClick={(e)=>handleShowInfoUser(e)} className='user-icon'>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                {isShowInfoUser && <UserInfo />}
            </div>
        </div>
    )
}
export default NavTop