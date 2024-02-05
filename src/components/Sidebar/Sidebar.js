import './Sidebar.scss'
import { Link, NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div className='sidebar-container'>
            <div className='zing-content'>
                <div className='h2 text-white'>
                <Link to='/' className='home-link'>
                    <span style={{color: '#008DC6'}}>Z</span>
                    <span style={{color: '#49A942'}}>i</span>
                    <span style={{color: '#F47B20'}}>n</span>
                    <span style={{color: '#EE2B74'}}>g</span>
                    <span className='h4'> mp3</span>
                                <span></span>
                </Link>
                </div>
            </div>
            <ul className='ps-0 mb-0 pb-3'>
                <li className='item'><NavLink to='/' >Discover</NavLink></li>
                <li className='item'><NavLink to='/Library/Song' >Library</NavLink></li>
            </ul>
            <ul className='ps-0 mb-0 pb-3'>
                <li className='item'><NavLink to='/playlist' >Playlist</NavLink></li>
            </ul>
        </div>
    )
}

export default Sidebar