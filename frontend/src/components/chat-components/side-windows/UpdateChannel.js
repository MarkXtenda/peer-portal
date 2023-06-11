import React, { useState } from 'react'
import './Settings.css'
import { useDispatch, useSelector } from 'react-redux'
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { DEFAULT_CHANNEL_URL } from '../../features/constants'
import { updateChannel } from '../../features/channel/ChannelSlice'
import { channelChosenSelector } from '../../features/channel/ChannelSelectors'

function UpdateChannel() {
  const dispatch = useDispatch();
  const avatarData = '';
  const [image, setAvatar] = useState('');
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const channelData = useSelector(channelChosenSelector)
  const channelId = 'your_channel_id'; // Replace with the actual channel ID

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    if(image) {formData.append('image', image);}
    if(channelName) {formData.append('name', channelName);}
    if(channelDescription) {formData.append('description', channelDescription);}
    dispatch(updateChannel(channelData.id, formData))
  };

  return (
    <div id='setting'>
      <div className="default" id='updateChannel' onClick={()=>dispatch(settingsTogleAction("updateChannel"))}>
        <span></span>
        <span></span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <img
            className="img-avatar"
            src={image ? URL.createObjectURL(image) : channelData.image ? channelData.image : DEFAULT_CHANNEL_URL}
            alt="user avatar"
          />
        </div>
        <label>Channel Image</label>
        <div className="file-input-container">
          <input
            className='file-input'
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e) => setAvatar(e.target.files[0])}
          />
          <label>Channel Name:</label>
          <input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
          />
          <label>Channel Description</label>
          <input
            value={channelDescription}
            onChange={(e) => setChannelDescription(e.target.value)}
          />
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  )
}

export default UpdateChannel