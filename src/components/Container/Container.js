import "./Container.scss";
import Toastify from "../Toastify/Toastify";
import { Outlet } from 'react-router-dom';

const Container = () => {
  return (
    <>
      <Outlet />
      <Toastify />
    </>
  );
};

export default Container;
