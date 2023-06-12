import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { addUser } from '../features/user/userSlice';
import Messages from './Messages';
import { userDataSelector } from '../features/user/userSelector';
import { settingsHideMenuAction } from '../features/settings/SettingsSlice';
import { settingsTogleAction } from '../features/settings/SettingsSlice';
import { DEFAULT_CHANNEL_URL } from '../features/constants';
import MessageForm from './user-page-components/MessageForm';
import "./Content.css"

function Content() {
  const chosenChannelState = useSelector(channelChosenSelector)
  const userState = useSelector(userDataSelector)
  const dispatch = useDispatch()
  
  return (
    <div className="content" onClick={()=>dispatch(settingsHideMenuAction())}>
      <div className="background-image">
        <div>
          <div className='channel-image-div' style={{textAlignLast: "center"}} >
          <img 
          style={{height: "100px", width: "100px", borderRadius: "50%"}} 
          src={chosenChannelState.image ? chosenChannelState.image : DEFAULT_CHANNEL_URL} />
          </div>
          <h1 id='channel-name'>{chosenChannelState.name}</h1>
          <div className='channel-settings'>
            <a href='#' className='usersChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Users: {chosenChannelState.users}</a>
            {chosenChannelState.creator_id === userState.id 
            ? 
            <div>
              <button className='updateChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Update Channel</button>
              <button className='deleteChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Delete Channel</button>
            </div>
            : 
            <div>
              {userState.channels.find((channel)=> channel.id === chosenChannelState.id) 
              ?
              <button className='leaveChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Leave Channel</button>
              :
              <button className='joinChannel' onClick={()=>dispatch(addUser(userState.id, chosenChannelState.id))}>Join Channel</button>
              }
            </div>
            }
            
          </div>
        </div>
          <Messages/>
          <MessageForm/>
      </div>
    </div>
  )
}

export default Content