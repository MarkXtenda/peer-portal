import React from 'react'
import './Settings.css'
import { useDispatch } from 'react-redux'
import { settingsTogleAction } from '../../features/settings/SettingsSlice'

function LeaveChannel() {
  const dispatch = useDispatch()
  return (
    <div id='settings'>
      <div className="default" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>X</div>
      Are you surer you want to leave the channel?
      <button>Yes</button>
      <button className="default" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>No</button>
    </div>
  )
}

export default LeaveChannel