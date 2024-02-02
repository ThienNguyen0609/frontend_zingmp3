import "./Home.scss";

import NavTop from "../Navbar/NavTop/NavTop";
import NavBottom from "../Navbar/NavBottom/NavBottom";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMyPlaylist } from "../../store/features/playlist/playlistSlice";
import { authenticateService, getService } from "../../servives/userService";
import { setUser } from "../../store/features/user/userSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserAuthenticated = async (userId) => {
    const data = await authenticateService(userId);
    if (data.errorCode) {
      dispatch(getMyPlaylist(userId));
      const userData = await getService(userId)
      dispatch(setUser(userData.user))
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

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem("account"));
    if (!session || !session.isAuthenticated) {
      navigate("/Login");
    } else {
      const user = session.data;

      checkUserAuthenticated(user.id);
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
