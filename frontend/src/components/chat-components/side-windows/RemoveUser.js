import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Settings.css";
import { channelChosenSelector } from "../../features/channel/ChannelSelectors";
import { removeUser } from "../../features/user/userSlice";
import { settingsTogleAction } from "../../features/settings/SettingsSlice";
import { userDataSelector } from "../../features/user/userSelector";
import { DEFAULT_AVATAR_URL } from "../../features/constants";

function RemoveUser() {
  const dispatch = useDispatch();
  const channelUsers = useSelector((state) => state.channel.channelCurrent.users_info); // not a function yet...
  const channel = useSelector(channelChosenSelector)
  const userData = useSelector(userDataSelector)

  useEffect(() => {
    // Fetch channel users or update the channelUsers state with the appropriate data
  }, []);

  function handleUserRemove(userId) {
    dispatch(removeUser(userId, channel.id));
  }

  return (
    <div id="setting">
      <div id="default" className="removeChannel" onClick={()=>dispatch(settingsTogleAction("removeChannel"))}>
        <span></span>
        <span></span>
      </div>
      <div className="form-container">
      <label className='notification-label'>Users:</label>
      </div>
      <div className="file-input-container">
        {channelUsers.map((user) => (
          <div key={user.id} id={user.id} className="user-item">
            <img alt="" src={user.avatar ? user.avatar : DEFAULT_AVATAR_URL} className="avatar" />
            <span className="username">{user.username}</span>
            {user.username === userData.username
            ?
            <button className="admin-remove-button" disabled>Admin</button>
            :
            <button onClick={() => handleUserRemove(user.id)} className="user-remove-button">Remove</button>
            }
          </div>
        ))}
        </div>
        </div>
  );
}

export default RemoveUser;
