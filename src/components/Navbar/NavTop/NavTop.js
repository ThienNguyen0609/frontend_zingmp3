import './NavTop.scss'

import UserInfo from './UserInfo/UserInfo';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSearch, faUser, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../configs/axios';
import SearchItem from './SearchItem/SearchItem';
import _ from 'lodash';
import { useSelector } from 'react-redux';

const NavTop = () => {
    const infoRef = useRef()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userInfo)
    const resultRef = useRef()
    const inputRef = useRef()
    const [search, setSearch] = useState('')
    const [dataSearched, setDataSearched] = useState([])
    const [isShowInfoUser, setIsShowInfoUser] = useState(false)
    
    const handleSearchElement = (value) => {
        setSearch(value)
    }
    const handleShowInfoUser = (e) =>{
        setIsShowInfoUser(!isShowInfoUser)
    }
    const handleClick = (e) => {
        inputRef.current.classList.add("input-focus")
    }
    const handleToSearchPage = () => {
        setSearch("")
        navigate(`/search/all?q=${search}`);
    }

    document.addEventListener("mousedown", (e)=>{
        if(resultRef.current && !e.target.closest(".result-search") && !e.target.closest(".search-input")) {
            resultRef.current.classList.add("d-none")
            inputRef.current.classList.remove("input-focus")
        }
        if(search && e.target.closest(".search-input")) {
            resultRef.current.classList.remove("d-none")
            inputRef.current.classList.add("input-focus")
        }
        if(!e.target.closest(".info-container") && isShowInfoUser) {
            setIsShowInfoUser(false)
        }
    })

    useEffect(()=>{
        const searchData = async () => {
            const dataSend = {search: search}
            const data = await axios.post('/search', dataSend)
            if(data && !_.isEmpty(data)) setDataSearched(data)
            else setDataSearched([])
        }
        let timer
        if(search.length >= 1) {
            timer = setTimeout(()=>{
                searchData()
            }, 200)
            resultRef.current.classList.add("animation")
            resultRef.current.classList.remove("d-none")
        }
        else {
            resultRef.current.classList.remove("animation")
            setDataSearched([])
        }
        return () => {
            clearTimeout(timer)
        }
    }, [search])
    return (
        <div className='nav-top-container'>
            <div className='my-container navbar-search'>
                <div className='navigate-search input-container'>
                    <div className='navigate'>
                        <FontAwesomeIcon className='navigate-left' onClick={()=>navigate(-1)} icon={faArrowLeft} /> 
                        <FontAwesomeIcon className='navigate-right' onClick={()=>navigate(1)} icon={faArrowRight} />
                    </div>
                    <div className='search-input-container' onClick={(e)=>handleClick(e)}>
                        <input 
                            type='text' className='search-input' value={search} name='search'
                            placeholder='What are you looking for?' ref={inputRef}
                            onChange={(e)=>handleSearchElement(e.target.value)}
                        />
                        <FontAwesomeIcon className='search-icon' icon={faSearch} />
                        <div className='result-search d-none' ref={resultRef}>
                            {search &&
                            <div className='result'>
                                <div className='search-result-content'>  
                                    <p>Top result</p>
                                    {dataSearched && !_.isEmpty(dataSearched) && (
                                        <p onClick={()=>handleToSearchPage()} className='all-result'>Find all for "{search}" <FontAwesomeIcon icon={faCaretRight} /></p>
                                    )}
                                </div>
                                {dataSearched && !_.isEmpty(dataSearched) ? dataSearched.map((item)=>(
                                    <SearchItem key={item.id} item={item} />
                                )):(
                                    <p className='no-result'>No result</p>
                                )}
                            </div>}
                        </div>
                    </div>
                </div>
                <div onClick={(e)=>handleShowInfoUser(e)} className={`user-icon ${user.category === "VIP" && "border-vip"}`}>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                {isShowInfoUser && <UserInfo ref={infoRef} />}
            </div>
        </div>
    )
}
export default NavTop