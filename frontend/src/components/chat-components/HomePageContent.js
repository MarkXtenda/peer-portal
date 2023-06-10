import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { addUser } from '../features/user/userSlice';
import Messages from './Messages';
import { userDataSelector } from '../features/user/userSelector';
import { settingsHideMenuAction } from '../features/settings/SettingsSlice';
import { settingsTogleAction } from '../features/settings/SettingsSlice';
import logo from "./logo.svg"
import MessageForm from './user-page-components/MessageForm';
import "./Content.css"

function HomePageContent() {
  const dispatch = useDispatch()
  
  return (
    <div className="content" onClick={()=>dispatch(settingsHideMenuAction())}>
      <div className="background-image">
        <div>
          <h1 id='channel-name'>Select a group to start messaging</h1>
        </div>
      </div>
    </div>
  )
}

export default HomePageContent