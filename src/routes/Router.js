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
import ErrorPage from "./ErrorPage";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Home from "../components/Home/Home";
import Library from "../components/Library/Library";
import Playlist from "../components/Playlist/Playlist";
import Video from "../components/Media/Video";
import Artist from "../components/ArtistInfo/Artist";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Container />,
      errorElement: <ErrorPage />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
            path: "/Library",
            element: <Library />
        },
        {
            path: "/Myplaylist",
            element: <Playlist />
        },
        {
            path: "/video-clip/watch",
            element: <Video />
        },
        {
            path: "/artist",
            element: <Artist />
        }
      ]
    },
    {
        path: "/Login",
        element: <Login />
    },
    {
        path: "/Register",
        element: <Register />
    }
]);
const Router = () => {
    return (
        <RouterProvider router={router} />
    )
}

export default Router