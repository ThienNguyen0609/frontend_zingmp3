import "./CreatePlaylistModal.scss";

import { Button, Form, Modal } from "react-bootstrap";
import { useState } from "react";
import { createPlaylist } from "../../../servives/playlistService";
import { useDispatch, useSelector } from "react-redux";
import { showTypeToastify } from "../../../servives/toastifyService";
import { getPlaylists } from "../../../store/features/playlist/playlistSlice";

const CreatePlaylistModal = (props) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch()
  const [value, setValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(value.length >= 3) {
      const response = await createPlaylist(value, user.id);
      if(response.errorCode) showTypeToastify(response.message, "success")
      else showTypeToastify(response.message, "warning")
      dispatch(getPlaylists(user.id))
      props.setShowModal(false)
    }
  };
  return (
    <>
      <Modal contentClassName="modal-bg" show={props.showModal} onHide={() => props.setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create new playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className="playlist-modal-form">
              <Form.Control
                placeholder="Name playlist"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <Button
                className="mt-3"
                variant="secondary"
                onClick={() => props.setShowModal(false)}
              >
                Close
              </Button>
              <Button className="mt-3 ms-3" type="submit">Create playlist</Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      {/* <div className="add-playlist-modal">
      <div className="add-modal">
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="playlist-modal-form">
            <div className="title h5 mb-3">Create new playlist</div>
            <Form.Control
              placeholder="Name playlist"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button className="mt-3" type="submit">
              Create playlist
            </Button>
          </Form.Group>
        </Form>
      </div>
    </div> */}
    </>
  );
};

export default CreatePlaylistModal;
