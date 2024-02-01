import './Upgrade.scss'

import ZingContent from "../ZingContent"
import UserInfo from './UserInfo/UserInfo';
import UpgradeCard from './UpgradeCard/UpgradeCard';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import _ from 'lodash';

const Upgrade = () => {
    const [user, setUser] = useState({})
    const [isShowInfoUser, setIsShowInfoUser] = useState(false)

    const handleShowInfoUser = () => {
        setIsShowInfoUser(!isShowInfoUser)
    }
    useEffect(()=>{
        const session = JSON.parse(localStorage.getItem("account"));
        console.log(session)
        if(session && !_.isEmpty(session) && !_.isEmpty(session.data)) setUser(session.data)
    }, [])
    return (
        <>
        <div className="upgrade-container">
            <div className='upgrade'>
                <div className="header-container">
                    <div className='header'>
                        <ZingContent className={"zing-icon"} />
                        <div onClick={(e)=>handleShowInfoUser(e)} className={`user-icon ${user.category === "VIP" && "border-vip"}`}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                        {isShowInfoUser && <UserInfo />}
                    </div>
                </div>
                <div className="body">
                    <div className='body-header'>
                        <p className='part1'>Unlimited Music</p>
                        <p className='part2'>Upgrade your account to experience own function and highest content</p>
                    </div>
                    <div className='body-middle'>
                        <div className='upgradde-card'>
                            <UpgradeCard className="plus-card">
                                <div className='card-header text-white'>
                                    <div><h1>Zing MP3</h1> <span>PLUS</span></div>
                                    <p>Listen to highest quality music, no advertisement</p>
                                    <h2>Only with 1 $/month</h2>
                                    <p className='btn-card btn-plus'>PACKAGE REGISTRATION</p>
                                </div>
                                <div className='card-body text-white'>
                                    <h5>Special privileges</h5>
                                    <ul className='features'>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> No advertisement</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Listen to and download Lossless music</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Unlimited storage</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Advanced music listening feature</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Expand upload ability</li>
                                    </ul>
                                </div>
                            </UpgradeCard>
                            <UpgradeCard className="premium-card">
                                <div className='card-header text-white'>
                                    <div><h1>Zing MP3</h1> <span>PREMIUM</span></div>
                                    <p>Listen to highest quality music, no advertisement</p>
                                    <h2>Only with 3 $/month</h2>
                                    <p className='btn-card btn-premium'>PACKAGE REGISTRATION</p>
                                </div>
                                <div className='card-body text-white'>
                                    <h5>Special privileges</h5>
                                    <ul className='features'>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Premium music store</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> No advertisement</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Listen to and download Lossless music</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Unlimited storage</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Advanced music listening feature</li>
                                        <li><FontAwesomeIcon className="feature-list-icon" icon={faCheck} /> Expand upload ability</li>
                                    </ul>
                                </div>
                            </UpgradeCard>
                        </div>
                    </div>
                </div>
            </div>
            <img className='upgrade-image' src={require("../../assets/images/discover_page/upgrade.png")} alt='logo' />
        </div>
        </>
    )
}

export default Upgrade