import React from 'react'
import { useSelector } from 'react-redux';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import Messages from './Messages';
import ChatBox from './ChatBox';

function Content({handleSeeMenu}) {
  function handleMessageSent(e) {
    e.preventDefault()
    console.log("sent")
  }
  const state = useSelector(channelChosenSelector)
  return (
    <div className="col-md-9 content" onClick={()=>handleSeeMenu(false)}>
      <div className="background-image">
        <h1>{state !== "default" ? state.name : "Select a group to start messaging"}</h1>
        {state !== "default" && <Messages/>}
      </div>
      <div style={{position: "fixed",bottom: "0px",left: "45%"}}>
        <form onSubmit={handleMessageSent}>
          <button type='submit'>image</button>
          <input></input>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  )
}

export default Content