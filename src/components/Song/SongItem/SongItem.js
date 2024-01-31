import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const SongItem = (props) => {
  const item = props.item
  const actorList = item.actor.split(", ");
  const { user } = useSelector((state) => state.userInfo);
  const [isHover, setIsHover] = useState({
    is: false,
    id: 0,
  });
  const [isShow, setIsShow] = useState(false);

  const handleMouseOver = (id) => {
    setIsHover({
      is: true,
      id: id,
    });
  };
  const handleMouseOut = () => {
    setIsHover({
      is: false,
      id: 0,
    });
  };
  const handleClick = () => {
    setIsShow(!isShow);
  };
  return (
    <tr className="song-item heigth bd-bottom">
      <td className="song-item-image">
        <div
          className="song-image"
          onMouseOver={() => handleMouseOver(item.id)}
          onMouseOut={() => handleMouseOut()}
          onClick={() => {
            localStorage.setItem("currentSong", JSON.stringify(item));
            props.handlePlaySong(item);
          }}
        >
          {isHover.is && isHover.id === item.id && (
            <FontAwesomeIcon className="play-icon" icon={faPlay} />
          )}
          <img
            src={require(`../../../assets/images/${item.image}.jpg`)}
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
      <td className="text-center">4:40</td>
      <td className="text-right position-relative">
        <FontAwesomeIcon
          onClick={() => handleClick()}
          className="song-option"
          icon={faEllipsisH}
        />
        {isShow && (
          <div className="option-content">
            <div className="option-header">
              <img
                src={require(`../../../assets/images/${item.image}.jpg`)}
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
                setIsShow(false);
                props.handleAction(user.id, item.id);
              }}
            >
              <FontAwesomeIcon icon={props.icon} /> {props.option}
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};

export default SongItem;
