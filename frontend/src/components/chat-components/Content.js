import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { addUser, sendMessage } from '../features/user/userSlice';
import Messages from './Messages';
import { userDataSelector } from '../features/user/userSelector';
import { settingsHideMenuAction } from '../features/settings/SettingsSlice';
import { settingsTogleAction } from '../features/settings/SettingsSlice';
import RemoveUser from './side-windows/RemoveUser';
import logo from "./logo.svg"

function Content() {
  const chosenChannelState = useSelector(channelChosenSelector)
  const userState = useSelector(userDataSelector)
  const [content, setContent] = useState("")
  const [image, setImage] = useState(null)
  const dispatch = useDispatch()
  function handleMessageSent(e) {
    e.preventDefault();
    console.log('handleMessageSent called');
    const formData = new FormData()
    if (image !== null) {
      formData.append("image", image)
      formData.append("content", content)
    }
    else {
      formData.append("content", content)
    }
    formData.append("channel_id", chosenChannelState.id)
    formData.append("user_id", userState.id)
    formData.append("creator", userState.username)
    setContent("")
    setImage(null)
    dispatch(sendMessage(chosenChannelState.id, formData))
  }
  return (
    <div className="col-md-9 content" onClick={()=>dispatch(settingsHideMenuAction())}>
      <div className="background-image">
        <div>
          {/* OPTIMIZE THE CODE BELLOW */}
          <div style={{textAlignLast: "center"}} >
          <img 
          style={{width: "100px", borderRadius: "50%"}} 
          src={chosenChannelState.image ? chosenChannelState.image : logo} />
          </div>
          <h1>{chosenChannelState !== "default" ? chosenChannelState.name : "Select a group to start messaging"}</h1>
          {chosenChannelState !== "default" && 
          <div>
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
            
          </div>}
        </div>
        {chosenChannelState !== "default" && <Messages/>}
      </div>
      <div style={{position: "fixed",bottom: "0px",left: "45%"}}>
        <form onSubmit={handleMessageSent} encType="multipart/form-data">
          <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e)=>setImage(e.target.files[0])}
          />
          <input type="text" value={content} onChange={(e) => setContent(e.target.value)}></input>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  )
}

export default Content