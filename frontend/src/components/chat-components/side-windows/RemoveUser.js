import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Settings.css";
import { channelChosenAdminSelector, channelChosenSelector, channelChosenUsersSelector } from "../../features/channel/ChannelSelectors";
import { removeUserAsAdmin } from "../../features/channel/ChannelSlice";
import { settingsTogleAction } from "../../features/settings/SettingsSlice";
import { userDataSelector } from "../../features/user/userSelector";
import { DEFAULT_AVATAR_URL } from "../../features/constants";

function RemoveUser() {
  const dispatch = useDispatch();
  const channelCurrentAdmin = useSelector(channelChosenAdminSelector)
  const channelUsers = useSelector(channelChosenUsersSelector); // not a function yet...
  const channel = useSelector(channelChosenSelector)
  const userData = useSelector(userDataSelector)


  function handleUserRemove(userId) {
    dispatch(removeUserAsAdmin(userId, channel.id));
  }

  return (
    <div className="more-channel-options">
      <div id="removeChannel" className="default" onClick={()=>dispatch(settingsTogleAction("removeChannel"))}>
        <span></span>
        <span></span>
      </div>
      <div className="form-container">
      <label className='notification-label'>Users:</label>
      </div>
      <div className="users-container">
        {channelUsers.map((user) => (
          <div key={user.id} id={user.id} className="user-item">
            <img alt="" src={user.avatar ? user.avatar : DEFAULT_AVATAR_URL} className="avatar" />
            <span className="username">{user.username}</span>
            {user.id === channelCurrentAdmin
            ?
            <button className="admin-remove-button" disabled>Admin</button>
            :
            channelCurrentAdmin === userData.id 
            ? 
            <button onClick={() => handleUserRemove(user.id)} className="user-remove-button">Remove</button>
            :
            <button className="user-remove-button-hidden">Remove</button>

            }
          </div>
        ))}
        </div>
        </div>
  );
}

export default RemoveUser;
