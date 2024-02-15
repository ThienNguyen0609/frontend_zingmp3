import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deletePlaylist } from "../../../servives/playlistService";
import { getPlaylists } from "../../../store/features/playlist/playlistSlice";
import { showTypeToastify } from "../../../servives/toastifyService";

const DeletePlaylistModal = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleDeletePlaylist = async (userId, playlistId) => {
    const response = await deletePlaylist(userId, playlistId);
    if (response.errorCode) showTypeToastify(response.message, "success");
    else showTypeToastify("something wrong", "error");
    dispatch(getPlaylists(userId));
    props.setShowModal(false)
  };
  return (
    <Modal
      contentClassName="modal-bg"
      show={props.showModal}
      onHide={() => props.setShowModal(false)}
    >
      <Modal.Header closeButton>
        <Modal.Title>Delete new playlist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>This playlist and songs will be delete, Are you sure to do this</div>
      </Modal.Body>
      <Modal.Footer>
        <Button className="mt-3" variant="secondary" onClick={() => props.setShowModal(false)}>
          Close
        </Button>
        <Button
          className="mt-3 ms-3"
          type="button"
          onClick={() => handleDeletePlaylist(user.id, props.playlistId)}
        >
          Delete playlist
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeletePlaylistModal;
