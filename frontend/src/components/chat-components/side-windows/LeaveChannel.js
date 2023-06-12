import React from 'react'
import './Settings.css'
import { useDispatch, useSelector } from 'react-redux'
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { userDataSelector } from '../../features/user/userSelector'
import { channelChosenSelector } from '../../features/channel/ChannelSelectors'
import { removeUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

function LeaveChannel() {
  const dispatch = useDispatch()
  const channel = useSelector(channelChosenSelector)
  const userData = useSelector(userDataSelector)
  const navigate = useNavigate();
  
  function handleLeaveChannel() {
    dispatch(removeUser(userData.id, channel.id));
    navigate('/', { replace: true });
  }
  function handleNo() {
    dispatch(settingsTogleAction("leaveChannel"))
  }
  return (
    <div className='setting-channel-options'>
      <div id="leaveChannel" className='default' onClick={handleNo}>
        <span></span>
        <span></span>
      </div>
      <div className="form-container">
        <label className='notification-label'>Are you surer you want to leave the channel?</label>
      </div>
      <div className='options'>
        <button type="submit" onClick={handleLeaveChannel}>Yes</button>
        <button type="submit" onClick={(e)=>handleNo}>No</button>
      </div>
    </div>
  )
}

export default LeaveChannel