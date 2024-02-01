import './UserInfo.scss'
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faPen } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { logoutService } from '../../../../servives/userService';
import { useEffect, useRef } from 'react';

const UserInfo = () => {
    const navigate = useNavigate()
    const { user } = useSelector(state => state.userInfo)

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

    return (
        <div className='info-container'>
            <div className='info'>
                <div className='user-icon'>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <label htmlFor="upload">
                    <div className='edit-icon'>
                        <FontAwesomeIcon icon={faPen} />
                    </div>
                    <input type="file" id="upload" style={{display:"none"}} />
                </label>
                <div className='user-info'>
                    {user && 
                    <>
                    <h4 className='user-username'>{user.username}</h4>
                    <p className='user-kind'>{user.category.type}</p>
                    </>
                    }
                </div>
            </div>
            <Link className='upgrade-account' to='/Upgrade' target='_blank'>
                Upgrade your account
            </Link>
            <div className='upgrade-pack'>
                <h5 className='text-white'>Upgrade pack</h5>
                <div className='upgrade-pack-premium upgrade-pack-item mt-3'>
                    <div><h4>Zing MP3</h4> <span className='premium kind-account'>PREMIUM</span></div>
                    <p className='upgrade-price'>60$/month</p>
                    <p className='upgrade-content'>All privilege of PLUS with monopoly music</p>
                    <Link className='upgrade-link upgrade-link-premium' to="/Upgrade" target='_blank'>More information</Link>
                </div>
            </div>
            <div className='individual'>
                <h5 className='text-white'>Individual</h5>
                <Link to={`/user/profile?u=${user.id}`} className='detail'>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <span>Profile</span>
                </Link>
                <button onClick={()=>handleLogout()} className='detail'>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faSignOutAlt} />
                    </div>
                    <span>Log out</span>
                </button>
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