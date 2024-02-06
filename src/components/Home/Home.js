import "./Home.scss";

import NavTop from "../Navbar/NavTop/NavTop";
import NavBottom from "../Navbar/NavBottom/NavBottom";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getPlaylists } from "../../store/features/playlist/playlistSlice";
import { authenticateService } from "../../servives/userService";
import { getUser } from "../../store/features/user/userSlice";
import _ from "lodash";

const Home = () => {
  const { userLoading, user } = useSelector(state => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkUserAuthenticated = async (userId) => {
    dispatch(getPlaylists(userId));
    dispatch(getUser(userId))
    // const data = await authenticateService(userId);
    // if (data.errorCode) {
    //   dispatch(getPlaylists(userId));
    //   dispatch(getUser(userId))
    // } else {
    //   const sessionData = {
    //     isAuthenticated: false,
    //     token: "",
    //     data: null,
    //   };
    //   localStorage.setItem("account", JSON.stringify(sessionData));
    //   navigate("/Login");
    // }
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
      {!userLoading && user && !_.isEmpty(user) && (
        <div className="create-container">
          <NavBottom />
          <Sidebar />
          <NavTop />
          <Outlet />
        </div>
      )}
    </>
  );
};

export default Home;
