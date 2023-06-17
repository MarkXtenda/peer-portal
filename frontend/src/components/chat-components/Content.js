import React, { useState } from 'react'
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
  const [visible, setVisible] = useState(false)
  const chosenChannelState = useSelector(channelChosenSelector)
  const userState = useSelector(userDataSelector)
  const dispatch = useDispatch()
  function handleOptions(e) {
    console.log(e.target, visible)
    const element = document.getElementById("users-desc-options-clicked");
    if (e.target.className === "usersChannel" || e.target.className === "descriptionChannel") {
      dispatch(settingsTogleAction(e.target.className));
      element.style.visibility = "collapse"
      setVisible(false)
    } else {
      (visible) ? element.style.visibility = "collapse" : element.style.visibility = "visible";
      setVisible(!visible)
    }
    
  }
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
            {/* <a href='#' className='usersChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Users: {chosenChannelState.users}</a> */}
            {chosenChannelState.creator_id === userState.id 
            ? 
            <div className='channel-options'>
              <button className='updateChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Update Channel</button>
              <button className='deleteChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Delete Channel</button>
              <div id='users-desc-options' onClick={(e)=>handleOptions(e)}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
              <div id='users-desc-options-clicked'>
                <div className='usersChannel' onClick={(e)=>handleOptions(e)}>Users: {chosenChannelState.users}</div>
                <div className='descriptionChannel' onClick={(e)=>handleOptions(e)}>Description</div>
              </div>
            </div>
            : 
            <div className='channel-options'>
              {userState.channels.find((channel)=> channel.id === chosenChannelState.id) 
              ?
              <button className='leaveChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Leave Channel</button>
              :
              <button className='joinChannel' onClick={()=>dispatch(addUser(userState.id, chosenChannelState.id))}>Join Channel</button>
              }
              <div id='users-desc-options' onClick={(e)=>handleOptions(e)}>
                <span>.</span>
                <span>.</span>
                <span>.</span>
              </div>
              <div id='users-desc-options-clicked'>
                <div className='usersChannel' onClick={(e)=>handleOptions(e)}>Users: {chosenChannelState.users}</div>
                <div className='descriptionChannel' onClick={(e)=>handleOptions(e)}>Description</div>
              </div>
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