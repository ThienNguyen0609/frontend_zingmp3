import './Home.scss'

import NavTop from '../Navbar/NavTop/NavTop';
import NavBottom from '../Navbar/NavBottom/NavBottom';
import Sidebar from '../Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

const Home = () => {
    return (
        <>
        <div className='create-container'>
            <NavBottom />
            <Sidebar />
            <NavTop />
        </div>
        <Outlet />
        </>
    )
}

export default Home