import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisH, faPlusSquare, faCompactDisc, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import { addSongToPlaylist, removeSongFromPlaylist } from "../../../servives/playlistService";
import { showTypeToastify } from "../../../servives/toastifyService";
import { updateFavorSong } from "../../../servives/songService";
import { getUser } from "../../../store/features/user/userSlice";
import { setFavoriteSongIds } from "../../../store/features/action/actionSlice";

const SongItem = (props) => {
  const { user } = useSelector(state => state.user)
  const { favoriteSongIds } = useSelector(state => state.actions)
  const item = props.item
  const actorList = item.actor.split(", ");
  const {playlist, playlistLoading} = useSelector(state => state.playlist)
  const dispatch = useDispatch()

  const [myPlaylist, setMyplaylist] = useState(playlist)
  const [value, setValue] = useState("")
  const [isShow, setIsShow] = useState(false);
  const [isShowPlaylist, setIsShowPlaylist] = useState(false);

  const handleAction = async (songId) => {
    if(props.isPlaylist) {
      const response = await removeSongFromPlaylist(props.playlistId, songId)
      props.handleRemoveItem(songId)
      if(response.errorCode) showTypeToastify(response.message, "success")
      else showTypeToastify(response.message, "warning")
    }
    else {
      setIsShowPlaylist(!isShowPlaylist)
    }
  }

  const handleAddToPlaylist = async (playlistId, songId) => {
    const response = await addSongToPlaylist(playlistId, songId)
    if(response.errorCode) showTypeToastify(response.message, "success")
    else showTypeToastify(response.message, "warning")
    setIsShow(false)
  }

  const handleFavorSong = async (songId) => {
    let newFavorSongId = []
    let message
    if(favoriteSongIds.includes(songId)) {
      newFavorSongId = favoriteSongIds.filter(songItem => songItem !== songId)
      message = "this song removed from favorite song"
    }
    else {
      newFavorSongId = [...favoriteSongIds, songId]
      message = "this song added to favorite song"
    }
    const response = await updateFavorSong(user.id, newFavorSongId)
    if(response.errorCode) showTypeToastify(message, "success")
    else showTypeToastify("somethingwrong", "error")
    dispatch(setFavoriteSongIds(newFavorSongId))
  }

  useEffect(() => {
    setMyplaylist(playlist.filter((item => item.namePlaylist.includes(value))))
  }, [value])
  return (
    <tr className="song-item heigth bd-bottom">
      <td className="song-item-image">
        <div
          className="song-image"
          onClick={() => {
            localStorage.setItem("currentSong", JSON.stringify(item));
            props.handlePlaySong(item);
          }}
        >
          <FontAwesomeIcon className="play-icon" icon={faPlay} />
          <img
            src={require(`../../../assets/images/Albums/${item.image}.jpg`)}
            alt="Logo"
            className="image"
          />
        </div>
        <div className="song-info">
          <p className="info-name">{item.name}</p>
          <p className="info-actor">
            {actorList &&
              actorList.map((actor, index) => {
                if (index === 0) return <span key={actor.split(" ").join("-")}><NavLink to={`/artor/${actor.split(" ").join("-")}`} className="actor">{actor}</NavLink></span>;
                else
                  return (
                    <span key={actor.split(" ").join("-")}>
                      , <NavLink to={`/artor/${actor.split(" ").join("-")}`} className="actor">{actor}</NavLink>
                    </span>
                  );
              })}
          </p>
        </div>
      </td>
      <td className="text-center">
        <span
          className={
            item["SongCategory.category"] === "BASIC" ? "basic classify" : "premium classify"
          }
        >
          {item["SongCategory.category"]}
        </span>
      </td>
      <td className="text-right position-relative">
        <div className="d-flex">
          <div 
          className={`favorite-icon ${!_.isEmpty(favoriteSongIds) && favoriteSongIds?.includes(item.id) ? "active" : ""}`}
          onClick={() => handleFavorSong(item.id)}
          >
            <FontAwesomeIcon icon={faHeart} />
          </div>
          <div 
          className="song-option"
          onClick={() => {
            setIsShow(!isShow)
            if(!props.isPlaylist && isShowPlaylist) setIsShowPlaylist(false)
          }}
          >
            <FontAwesomeIcon
              icon={faEllipsisH}
            />
          </div>
        </div>
        {isShow && (
          <div className="option-content">
            <div className="option-header">
              <img
                src={require(`../../../assets/images/Albums/${item.image}.jpg`)}
                alt="Logo"
                className="image"
              />
              <div className="song-info">
                <p className="info-name">{item.name}</p>
                <p className="info-actor">
                  {actorList &&
                    actorList.map((actor, index) => {
                      if (index === 0) return <span key={actor.split(" ").join("-")}><NavLink to={`/artor/${actor.split(" ").join("-")}`} className="actor">{actor}</NavLink></span>;
                      else
                        return (
                          <span key={actor.split(" ").join("-")}>
                            , <NavLink to={`/artor/${actor.split(" ").join("-")}`} className="actor">{actor}</NavLink>
                          </span>
                        );
                    })}
                </p>
              </div>
            </div>
            <div
              className="option-item"
              onClick={() => {
                handleAction(item.id);
              }}
            >
              <FontAwesomeIcon icon={props.icon} /> {props.option}
            </div>
              {isShowPlaylist && (
                <div className="show-playlist">
                  <input className="form-control search-playlist" type="text" placeholder="Search playlist" value={value} onChange={(e)=>setValue(e.target.value)} />
                  <div className="create-playlist-content"><FontAwesomeIcon className="icon" icon={faPlusSquare} /> Create playlist</div>
                <div className="display-playlist">
                {!playlistLoading && myPlaylist && !_.isEmpty(myPlaylist) && myPlaylist.map((playlistItem) => {
                  return (
                    <div key={playlistItem.id} className="show-playlist-item" onClick={() => handleAddToPlaylist(playlistItem.id, item.id)}>
                      <FontAwesomeIcon className="icon" icon={faCompactDisc} /> {playlistItem.namePlaylist}
                    </div>
                  )
                })}
                </div>
                </div>
              )}
          </div>
        )}
      </td>
    </tr>
  );
};

export default SongItem;