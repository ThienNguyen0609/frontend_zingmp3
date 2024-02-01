import { useSearchParams } from 'react-router-dom'
import './Profile.scss'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getService } from '../../servives/userService'
import { showTypeToastify } from '../../servives/toastifyService'

const Profile = () => {
    const [searchParams] = useSearchParams()
    const [user, setUser] = useState({})

    console.log(searchParams.get("u"))
    useEffect(()=>{
        const getUser = async () => {
            const response = await getService(searchParams.get("u"))
            if(response.errorCode) setUser(response.user)
            else showTypeToastify(response.message, "error")
        }

        getUser()
    }, [])
    return (
        <div className="profile-container">
            <div className='profile-bg-image'>
                <img src={require(`../../assets/images/discover_page/upgrade.png`)} alt='image' />
            </div>
            <div className="my-container">
                <div className='p-zindex-1'>
                    <div className='profile-header'>
                        <img className='profile-image' src={require(`../../assets/images/User/user15.jpg`)} alt='user-logo' />
                        <h1 className='profile-username ms-3'>{user.name}</h1>
                    </div>
                    <div>
                        <h1>Profile</h1>
                    </div>
                    <div className='mt-3'>
                        <dl className='row'>
                            <dt className='col-sm-2 mb-3'>USERNAME</dt>
                            <dd className='col-sm-4 mb-3'>{user.username}</dd>
                            <dt className='col-sm-2 mb-3'>COUNTRY</dt>
                            <dd className='col-sm-4 mb-3'>{user.country}</dd>
                            <dt className='col-sm-2 mb-3'>GENDER</dt>
                            <dd className='col-sm-4 mb-3'>{user.gender}</dd>
                            <dt className='col-sm-2 mb-3'>DATE OF BIRTH</dt>
                            <dd className='col-sm-4 mb-3'>{user.dateofbirth}</dd>
                            <dt className='col-sm-2 mb-3'>EMAIL</dt>
                            <dd className='col-sm-4 mb-3'>{user.email}</dd>
                        </dl>
                    </div>
                    <Link className='btn redirect-link' to={`/user/profile/edit?u=${user.id}`}>
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Profile