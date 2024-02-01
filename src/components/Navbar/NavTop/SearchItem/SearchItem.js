import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faPlay } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setCurrentList } from "../../../../store/features/action/actionSlice";
import { addSongToPlaylist } from "../../../../servives/playlistService";
import { showTypeToastify } from "../../../../servives/toastifyService";
import { getMyPlaylist } from "../../../../store/features/playlist/playlistSlice";
import { authorityService } from "../../../../servives/userService";

const SearchItem = ({item}) => {
  const [show, setShow] = useState(false)
  const {user} = useSelector(state => state.userInfo)
  const dispatch = useDispatch()

  const handleCheckPermission = async (song) => {
    const data = await authorityService(song.id, user.id)
    if(data.errorCode) {
      dispatch(setCurrentSong(song));
    }
    else showTypeToastify(data.message, "warning")
    dispatch(setCurrentList([song]));
  }

  const handleAddToPlaylist = async (songId) => {
    const data = await addSongToPlaylist(user.id, songId)
    if(data.errorCode) showTypeToastify(data.message, "success")
    else showTypeToastify(data.message, "warning")
    dispatch(getMyPlaylist(user.id))
  }
  return (
    <div
      className="result-item"
    >
      <div className="item-image" 
        onClick={()=>handleCheckPermission(item)}
      >
        <FontAwesomeIcon className="play-icon" icon={faPlay} />
        <img
          src={require(`../../../../assets/images/Albums/${item.image}.jpg`)}
          alt="logo"
        />
      </div>
      <div className="item-info">
        <p className="info-name">{item.name}</p>
        <p className="info-actor">{item.actor}</p>
      </div>
      <div className="item-option-container">
        <div className="item-option" onClick={()=>{setShow(!show)}}>
          <FontAwesomeIcon className="option" icon={faEllipsisH} />
        </div>
        <div 
          className={!show ? "show-option" : "show-option active"}
          onClick={()=>handleAddToPlaylist(item.id)}
        >
          Add to playlist
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
