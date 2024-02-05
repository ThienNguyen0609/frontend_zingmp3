import "./SearchItem.scss";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faPlay, faPlusSquare, faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setCurrentList } from "../../../../store/features/action/actionSlice";
import { showTypeToastify } from "../../../../servives/toastifyService";
import { authorityService } from "../../../../servives/userService";
import _ from "lodash";
import { addSongToPlaylist } from "../../../../servives/playlistService";

const SearchItem = ({ item }) => {
  const { user } = useSelector((state) => state.user);
  const { playlistLoading, playlist } = useSelector((state) => state.playlist);
  const dispatch = useDispatch();

  const [value, setValue] = useState();

  const handleCheckPermission = async (song) => {
    const data = await authorityService(song.id, user.id);
    if (data.errorCode) {
      dispatch(setCurrentSong(song));
    } else showTypeToastify(data.message, "warning");
    dispatch(setCurrentList([song]));
  };

  const handleAddToPlaylist = async (playlistId) => {
    const response = await addSongToPlaylist(playlistId, item.id)
    if(response.errorCode) showTypeToastify(response.message, "success")
    else showTypeToastify(response.message, "warning")
  }
  return (
    <div className="result-item">
      <div className="item-image" onClick={() => handleCheckPermission(item)}>
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
        <div className="item-option">
          <FontAwesomeIcon className="option" icon={faEllipsisH} />
        </div>
        <div className="show-option">
          <div className="option-content">Add to playlist</div>
          <div className="blabla"></div>
        </div>

        <div className="show-playlist">
          <input
            className="form-control search-playlist"
            type="text" placeholder="Search playlist" value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="create-playlist-content">
            <FontAwesomeIcon className="icon" icon={faPlusSquare} /> Create playlist
          </div>
          {!playlistLoading && playlist && !_.isEmpty(playlist) &&
          playlist.map((playlistItem) => {
            return (
              <div
                key={playlistItem.id} className="show-playlist-item"
                onClick={() => handleAddToPlaylist(playlistItem.id)}
              >
                <FontAwesomeIcon className="icon" icon={faCompactDisc} /> {playlistItem.namePlaylist}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
