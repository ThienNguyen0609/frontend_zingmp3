import './Container.scss'
import NavTop from './Navbar/NavTop';
import NavBottom from './Navbar/NavBottom';
import Sidebar from './Sidebar/Sidebar';
import Video from '../Media/Video';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Container = () => {
  const navigate = useNavigate()

  useEffect(()=>{
    let session = JSON.parse(localStorage.getItem("account"))
    if(!session || !session.isAuthenticated) {
      navigate('/Login')
    }
  }, [])
  return (
    <>
    <div className='create-container'>
      <NavBottom />
      <Sidebar />
      <NavTop />
    </div>
    <Outlet />
    </>
  );
}

export default Container