import "./Home.scss";

import NavTop from "../Navbar/NavTop/NavTop";
import NavBottom from "../Navbar/NavBottom/NavBottom";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from '../../store/features/user/userSlice';
import { getMyPlaylist } from "../../store/features/playlist/playlistSlice";
import { authenticateService } from "../../servives/userService";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUserAuthenticated = async (user) => {
      const data = await authenticateService(user.id);
      if (data.errorCode) {
        dispatch(getMyPlaylist(user.id));
        dispatch(setUser(user));
      } else {
        const sessionData = {
          isAuthenticated: false,
          token: "",
          data: null,
        };
        localStorage.setItem("account", JSON.stringify(sessionData));
        navigate("/Login");
      }
    };
    const session = JSON.parse(localStorage.getItem("account"));
    if (!session || !session.isAuthenticated) {
      navigate("/Login");
    } else {
      const user = session.data;

      checkUserAuthenticated(user);
    }
  }, []);
  return (
    <>
      <div className="create-container">
        <NavBottom />
        <Sidebar />
        <NavTop />
      </div>
      <Outlet />
    </>
  );
};

export default Home;
