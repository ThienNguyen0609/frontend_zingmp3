// import {
//     BrowserRouter,
//     Routes,
//     Route,
// } from "react-router-dom";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Container from "../components/Container/Container";
import Home from "../components/Home/Home";
import ErrorPage from "./ErrorPage";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Discover from "../components/Discover/Discover";
import Library from "../components/Library/Library";
import Playlist from "../components/Playlist/Playlist";
import Video from "../components/Navbar/NavBottom/Media/Video";
import Artist from "../components/ArtistInfo/Artist";
import Search from "../components/Search/Search";
import Upgrade from "../components/Upgrade/Upgrade";
import Profile from "../components/Profile/Profile";
import EditUser from "../components/EditUser/EditUser";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/Login",
            element: <Login />
        },
        {
            path: "/Register",
            element: <Register />
        },
        {
            path: "/",
            element: <Home />,
            children: [
                {
                    index: true,
                    path: "/",
                    element: <Discover />
                },
                {
                    path: "Library/Song",
                    element: <Library />
                },
                {
                    path: "/myPlaylist",
                    element: <Playlist />
                },
                {
                    path: "/video-clip/watch",
                    element: <Video />
                },
                {
                    path: "/artor/:actorName",
                    element: <Artist />
                },
                {
                    path: "/search/all",
                    element: <Search />
                },
                {
                    path: "/user/profile",
                    element: <Profile />
                },
                {
                    path: "/user/profile/edit",
                    element: <EditUser />
                }
            ]
        },
        {
            path: "/Upgrade",
            element: <Upgrade />
        }
      ]
    }
]);
const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router