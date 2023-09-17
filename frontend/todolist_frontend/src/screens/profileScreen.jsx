import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../../store/apis/usersApi";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Loader from "../components/loader";
import { FaEdit, FaSave, FaTimes } from "react-icons/fa";
import { GoSync } from "react-icons/go";
import { loggedIn } from "../../store";

import Error from "../components/error";

function ProfileScreen() {
  const [updateUser, results] = useUpdateUserMutation();
  const { data, isFetching, error } = useGetUserQuery();
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
  });
  const [isEdit, setIsEdit] = useState(false);
  const handleSave = async () => {
    setIsEdit(false);

    try {
      const res = await updateUser(profileData).unwrap();
      const data = { id: res._id, name: res.name, list: res.list };
      dispatch(loggedIn(data));
    } catch (err) {
      console.log("Error:" + err);
    }
  };
  const handleEdit = () => {
    if (data.name != profileData.name || data.email != profileData.email) {
      setProfileData({ name: data.name, email: data.email });
    }
    setIsEdit(!isEdit);
  };

  let content;

  if (isFetching) {
    content = <Loader />;
  } else if (data) {
    content = (
      <>
        <div className="profile-box">
          <div className="user-data-box">
            <div className="name">
              <p>Name:{data.name}</p>
              {isEdit && (
                <input
                  type="text"
                  value={profileData.name}
                  placeholder="Enter New Name"
                  onChange={(e) =>
                    setProfileData((d) => {
                      return { ...d, name: e.target.value };
                    })
                  }
                />
              )}
            </div>
            <div className="email">
              <p>Email:{data.email}</p>
              {isEdit && (
                <input
                  type="email"
                  value={profileData.email}
                  placeholder="Enter New Email"
                  onChange={(e) => {
                    setProfileData((d) => {
                      return { ...d, email: e.target.value };
                    });
                  }}
                />
              )}
            </div>
            <div className="password">
              <p>Pending Tasks:{data.pendingTasks.length}</p>
            </div>
          </div>
          <div className="edit-btn">
            <button onClick={handleEdit}>
              {!isEdit ? <FaEdit /> : <FaTimes />}
            </button>
            <button onClick={handleSave}>
              {results.isLoading ? <GoSync className="spinner" /> : <FaSave />}
            </button>
          </div>
        </div>
      </>
    );
  } else if (error) {
    content = (
      <Error
        status="500:Server Error!"
        message="something went wrong,check your network !"
      />
    );
  }
  return <>{content}</>;
}

export default ProfileScreen;
