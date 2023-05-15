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
    formData.append('image', image);
    formData.append('name', channelName);
    formData.append('description', channelDescription);
    console.log(channelData.id, formData)
    dispatch(updateChannel(channelData.id, formData))
  };
  return (
    <div id='settings'>
      <div className="default" onClick={(e) => dispatch(settingsTogleAction(e.target.className))}>X</div>
      <form onSubmit={handleSubmit}>
        <img
          className="img-avatar"
          src={image ? URL.createObjectURL(image) : avatarData.image ? avatarData.image : DEFAULT_CHANNEL_URL}
          alt="user avatar"
        />
        <label>Channel Image</label>
        <input
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
        <input type="submit" value="Update Channel" />
      </form>
    </div>
  )
}

export default UpdateChannel