import React from 'react'
import './Settings.css'
import { useDispatch, useSelector } from 'react-redux'
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { userDataSelector } from '../../features/user/userSelector'
import { channelChosenSelector } from '../../features/channel/ChannelSelectors'
import { removeUser } from '../../features/user/userSlice'

function LeaveChannel() {
  const dispatch = useDispatch()
  const channel = useSelector(channelChosenSelector)
  const userData = useSelector(userDataSelector)
  function handleLeaveChannel() {
    dispatch(removeUser(userData.id, channel.id));
  }
  return (
    <div id='settings'>
      <div className="default" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>X</div>
      Are you surer you want to leave the channel?
      <button onClick={handleLeaveChannel}>Yes</button>
      <button className="default" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>No</button>
    </div>
  )
}

export default LeaveChannel