import React from 'react'
import './Settings.css'
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel } from '../../features/channel/ChannelSlice'
import { channelChosenSelector } from '../../features/channel/ChannelSelectors'
import { useNavigate } from 'react-router-dom'

function DeleteChannel() {
  const dispatch = useDispatch();
  const channelCurrent = useSelector(channelChosenSelector);
  const navigate = useNavigate();

  const handleDelete = () => {
    dispatch(deleteChannel(channelCurrent.id));
    dispatch(settingsTogleAction("deleteChannel"))
    navigate('/', { replace: true });
  };
  function handleNo() {
    dispatch(settingsTogleAction("deleteChannel"))
  }

  return (
    <div id='setting'>
      <div id="deleteChannel" className='default' onClick={handleNo}>
        <span></span>
        <span></span>
      </div>
      <div className="form-container">
      <label className='notification-label'>Are you sure you want to delete the channel?</label>
      </div>
      <div className='options'>
        <button type="submit" onClick={handleDelete}>Yes</button>
        <button type="submit" onClick={(e) => handleNo}>No</button>
      </div>
    </div>
  )
}

export default DeleteChannel;
