import React from 'react'
import './Settings.css'
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel } from '../../features/channel/ChannelSlice'
import { channelChosenSelector } from '../../features/channel/ChannelSelectors'

function DeleteChannel() {
  const dispatch = useDispatch();
  const channelCurrent = useSelector(channelChosenSelector);

  const handleDelete = () => {
    dispatch(deleteChannel(channelCurrent.id));
    dispatch(settingsTogleAction("default"))
    // Add any additional logic or redirect after successful deletion
  };

  return (
    <div id='settings'>
      <div className="default" onClick={(e) => dispatch(settingsTogleAction(e.target.className))}>X</div>
      Are you sure you want to delete the channel?
      <button onClick={handleDelete}>Yes</button>
      <button className="default" onClick={(e) => dispatch(settingsTogleAction(e.target.className))}>No</button>
    </div>
  )
}

export default DeleteChannel;
