import "./Container.scss";
import Toastify from "../Toastify/Toastify";
import { getMyPlaylist } from '../../store/features/playlist/playlistSlice';
import { setUser } from '../../store/features/user/userSlice';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { authenticateService } from "../../servives/userService";

const Container = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuthenticated = async (user) => {
      const data = await authenticateService(user.id)
      if(data.errorCode) {
        dispatch(getMyPlaylist(user.id));
        dispatch(setUser(user));
      }
      else {
        const sessionData = {
          isAuthenticated: false,
          token: "",
          data: null
        }
        localStorage.setItem("account", JSON.stringify(sessionData));
        navigate('/Login')
      }
    }
    const session = JSON.parse(localStorage.getItem("account"));
    if (!session || !session.isAuthenticated) {
      navigate("/Login");
    } else {
      const user = session.data;

      checkUserAuthenticated(user)
    }
  }, []);
  return (
    <>
      <Outlet />
      <Toastify />
    </>
  );
};

export default Container;
