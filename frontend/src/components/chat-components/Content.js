import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { sendMessage } from '../features/user/userSlice';
import Messages from './Messages';
import { userDataSelector } from '../features/user/userSelector';
import { settingsHideMenuAction } from '../features/settings/SettingsSlice';
import { settingsTogleAction } from '../features/settings/SettingsSlice';

function Content() {
  const chosenChannelState = useSelector(channelChosenSelector)
  const userState = useSelector(userDataSelector)
  const [content, setContent] = useState("")
  const dispatch = useDispatch()
  function handleMessageSent(e) {
    e.preventDefault();
    console.log('handleMessageSent called');
    const data = {
      "channel_id": chosenChannelState.id,
      "user_id": userState.id,
      "creator": userState.username,
      "content": content
    }
    dispatch(sendMessage(chosenChannelState.id, data))
    setContent("")
  }
  return (
    <div className="col-md-9 content" onClick={()=>dispatch(settingsHideMenuAction())}>
      <div className="background-image">
        <div>
          {/* OPTIMIZE THE CODE BELLOW */}
          <h1>{chosenChannelState !== "default" ? chosenChannelState.name : "Select a group to start messaging"}</h1>
          {chosenChannelState !== "default" && 
          <div>
            <p>Users: {chosenChannelState.users}</p>
            {chosenChannelState.creator_id === userState.id 
            ? 
            <div>
              <button className='updateChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Update Channel</button>
              <button className='deleteChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Delete Channel</button>
            </div>
            : 
            <div><button className='leaveChannel' onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Leave Channel</button></div>
            }
            
          </div>}
        </div>
        {chosenChannelState !== "default" && <Messages/>}
      </div>
      <div style={{position: "fixed",bottom: "0px",left: "45%"}}>
        <form onSubmit={handleMessageSent}>
          {/* <button type='submit'>image</button> */}
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)}></input>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  )
}

export default Content