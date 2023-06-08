import React, { useState } from "react";
import "./Settings.css";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../features/user/userSelector";
import { changeAvatarUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { DEFAULT_AVATAR_URL } from "../../features/constants";
import { settingsTogleAction } from "../../features/settings/SettingsSlice";

function Settings() {
  const userData = useSelector(userDataSelector);
  const [avatar, setAvatar] = useState("");
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", avatar);
    formData.append("user_id", userData.id);
    dispatch(changeAvatarUser(formData));
  }

  return (
    <div id="setting" className="settings-container">
      <div className="default" onClick={()=>dispatch(settingsTogleAction("settings"))}>
        <span></span>
        <span></span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <img
            className="img-avatar"
            src={
              avatar
                ? URL.createObjectURL(avatar)
                : userData.avatar
                ? userData.avatar.url
                : DEFAULT_AVATAR_URL
            }
            alt="user avatar"
          />
        </div>
        <label htmlFor="avatar-input">Profile Image</label>
        <div className="file-input-container">
            <input
            className="file-input"
            id="avatar-input"
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e) => setAvatar(e.target.files[0])}
            />
            <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Settings;
