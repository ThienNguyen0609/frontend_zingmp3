import './UserInfo.scss'

// import { getUserService } from '../../../servives/userService';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUser, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const UserInfo = () => {
    const navigate = useNavigate()
    const [account, setAccount] = useState(null)

    const handleLogout = () => {
        let data = {
          isAuthenticated: false,
          token: "fakeToken",
          data: null
        }
        localStorage.setItem("account", JSON.stringify(data));
        navigate('/Login')
    }

    useEffect(()=>{
        const session = JSON.parse(localStorage.getItem("account"))
        if(session && session.isAuthenticated) {
            setAccount(session.data)
        }
    }, [])

    return (
        <div className='info-container'>
            <div className='info'>
                <div className='user-icon'>
                    <FontAwesomeIcon icon={faUser} />
                </div>
                <div className='user-info'>
                    {account && 
                    <>
                    <h4 className='user-username'>{account.username}</h4>
                    <p className='user-kind'>{account.member}</p>
                    </>
                    }
                </div>
            </div>
            <Link className='upgrade-account' to='/'>
                Upgrade your account
            </Link>
            <div className='upgrade-pack'>
                <h5 className='text-white'>Upgrade pack</h5>
                <div className='upgrade-pack-plus upgrade-pack-item'>
                    <div><h4>Zing MP3</h4> <span className='plus kind-account'>PLUS</span></div>
                    <p className='upgrade-price'>20$/month</p>
                    <p className='upgrade-content'>Experience listening to misic with highest quality, no ads</p>
                    <Link className='upgrade-link upgrade-link-plus' to="/">More information</Link>
                </div>
                <div className='upgrade-pack-premium upgrade-pack-item'>
                    <div><h4>Zing MP3</h4> <span className='premium kind-account'>PREMIUM</span></div>
                    <p className='upgrade-price'>60$/month</p>
                    <p className='upgrade-content'>All privilege of PLUS with monopoly music</p>
                    <Link className='upgrade-link upgrade-link-premium' to="/">More information</Link>
                </div>
            </div>
            <div className='individual'>
                <h5 className='text-white'>Individual</h5>
                <Link to="/" className='detail'>
                    <div className='icon'>
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
                    <span>Detail</span>
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

export default UserInfo