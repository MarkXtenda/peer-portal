import React, { useState } from 'react'
import { DEFAULT_CHANNEL_URL } from '../../features/constants'
import "./Settings.css"
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { userDataSelector } from '../../features/user/userSelector'
import { addChannel } from '../../features/channel/ChannelSlice';

function CreateChannel() {
  const userData = useSelector(userDataSelector);
  const [image, setImage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelPrivate, setChannelPrivate] = useState(false)
  const [channelInvitekey, setChannelInvitekey] = useState("")
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData()
    formData.append("image", image)
    formData.append("name", channelName)
    formData.append("description", channelDescription)
    formData.append("private", channelPrivate)
    formData.append("invitekey", channelInvitekey)
    dispatch(addChannel(formData));
  }

  return (
    <div id='settings'>
      <div className="default" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>X</div>
      <form onSubmit={handleSubmit}>
        <img
          className="img-avatar"
          src={image ? URL.createObjectURL(image) : DEFAULT_CHANNEL_URL}
          alt="channel image"
        />
        <label>Channel Image</label>
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={(e)=>setImage(e.target.files[0])}
        />
        <label>Channel Name:</label>
        <input value={channelName} onChange={(e) => setChannelName(e.target.value)} />
        <label>Channel Description</label>
        <input value={channelDescription} onChange={(e) => setChannelDescription(e.target.value)} />
        <label>Channel Privacy: private</label>
        <input type='checkbox' value={channelPrivate} onChange={(e) => setChannelPrivate(!channelPrivate)} />
        <label>Channel Invite Key</label>
        <input value={channelInvitekey} onChange={(e) => setChannelInvitekey(e.target.value)} />
        <p>Channel Creator: {userData.username} (you)</p>
        <input type="submit" />
      </form>
    </div>
  );
}

export default CreateChannel;