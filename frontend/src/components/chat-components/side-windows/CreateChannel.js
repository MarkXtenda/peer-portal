import React, { useState } from 'react'
import { DEFAULT_CHANNEL_URL } from '../../features/constants'
import "./Settings.css"
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { userDataSelector } from '../../features/user/userSelector'
import { addChannel } from '../../features/channel/ChannelSlice';
import { useNavigate } from 'react-router-dom'
import { channelChosenSelector } from '../../features/channel/ChannelSelectors'

function CreateChannel() {
  const userData = useSelector(userDataSelector);
  const currentCreatedChannel = useSelector(channelChosenSelector)
  const [image, setImage] = useState("");
  const [channelName, setChannelName] = useState("");
  const [channelDescription, setChannelDescription] = useState("");
  const [channelPrivate, setChannelPrivate] = useState(false)
  const [channelInvitekey, setChannelInvitekey] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData()
    if (image) {formData.append("image", image)}
    formData.append("name", channelName)
    formData.append("description", channelDescription)
    formData.append("private", channelPrivate)
    if (channelInvitekey.length) formData.append("invitekey", "#"+channelInvitekey);
    dispatch(addChannel(formData));
    navigate(`/channels/${currentCreatedChannel.id}`, { replace: true });
  }
  
  return (
    <div id='setting-createChannel'> 
      <div id="createChannel" className='default' onClick={()=>dispatch(settingsTogleAction("createChannel"))}>
        <span></span>
        <span></span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='form-container'>
          <img
            className="img-avatar"
            src={image ? URL.createObjectURL(image) : DEFAULT_CHANNEL_URL}
            alt="channel image"
          />
          </div>
          <label htmlFor="avatar-input">Channel Image</label>
          <div className="file-input-container">
            <input
            className="file-input"
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
            <button type="submit">Submit</button>
          </div>
      </form>
    </div>
  );
}

export default CreateChannel;