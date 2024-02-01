import './UserInfo.scss'

import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { logoutService } from '../../../servives/userService';
import { useState, useEffect } from 'react';
import _ from 'lodash';

const UserInfo = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    const handleLogout = async () => {
        const data = {
          isAuthenticated: false,
          token: "",
          data: null
        }
        localStorage.setItem("account", JSON.stringify(data));
        const response = await logoutService(user.id)
        console.log(response)
        navigate('/Login')
    }
    useEffect(()=>{
        const session = JSON.parse(localStorage.getItem("account"));
        console.log(session)
        if(session && !_.isEmpty(session) && !_.isEmpty(session.data)) setUser(session.data)
    }, [])
    return (
        <div className='popover-container'>
            <div className='popover-user'>
                <div className='popover-user-icon'>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='user-info'>
                    {user && 
                    <>
                    <h4 className='user-username'>{user.username}</h4>
                    <p className='user-caterogy'>{user.category}</p>
                    </>
                    }
                </div>
            </div>
            <div className='individual'>
                <h5 className='text-white'>Individual</h5>
                <p onClick={()=>handleLogout()} className='detail'>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                    <span>Log out</span>
                </p>
            </div>
        </div>
    )
}


{/* <div className='upgrade-pack-plus upgrade-pack-item'>
<div><h4>Zing MP3</h4> <span className='plus kind-account'>PLUS</span></div>
<p className='upgrade-price'>20$/month</p>
<p className='upgrade-content'>Experience listening to misic with highest quality, no ads</p>
<Link className='upgrade-link upgrade-link-plus' to="/">More information</Link>
</div> */}

export default UserInfo