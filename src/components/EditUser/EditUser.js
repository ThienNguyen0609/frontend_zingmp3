import "./EditUser.scss";
import EditForm from "./EditForm/EditForm";
import { useSelector } from "react-redux";

const EditUser = () => {
    const { user } = useSelector(state => state.user)
  return (
    <div className="edit-user-container">
      <div className="my-container">
        <div className="content">
          <h1>Edit</h1>
        </div>
        <div className="edit mt-3">
            <dl className="row">
                <dt className="col-sm-2">Username</dt>
                <dd className="col-sm-10">{user.username}</dd>
            </dl>
          <EditForm user={user} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
