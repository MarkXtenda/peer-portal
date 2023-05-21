import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./RemoveUser.css";
import { channelChosenSelector } from "../../features/channel/ChannelSelectors";
import { removeUser } from "../../features/user/userSlice";

function RemoveUser() {
  const dispatch = useDispatch();
  const channelUsers = useSelector((state) => state.user.user.channel); // not a function yet...
  const channel = useSelector(channelChosenSelector)

  useEffect(() => {
    // Fetch channel users or update the channelUsers state with the appropriate data
  }, []);

  function handleUserRemove(userId) {
    dispatch(removeUser(userId, channel.id));
  }

  return (
    <div id="some-div">
      <div id="all-users">
        <h2>Users:</h2>
        {/* {channelUsers.map((user) => (
          <div key={user.id} id={user.id} className="user-item">
            <img alt="" src={user.avatar} className="avatar" />
            <span className="username">{user.username}</span>
            <button onClick={() => handleUserRemove(user.id)} className="remove button">Remove</button>
          </div>
        ))} */}
      </div>
    </div>
  );
}

export default RemoveUser;
