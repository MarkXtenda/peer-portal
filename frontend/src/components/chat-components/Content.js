import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { sendMessage } from '../features/user/userSlice';
import Messages from './Messages';
import { userDataSelector } from '../features/user/userSelector';

function Content({handleSeeMenu}) {
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
    console.log(data)
    dispatch(sendMessage(chosenChannelState.id, data))
    setContent("")
  }
  return (
    <div className="col-md-9 content" onClick={()=>handleSeeMenu(false)}>
      <div className="background-image">
        <h1>{chosenChannelState !== "default" ? chosenChannelState.name : "Select a group to start messaging"}</h1>
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