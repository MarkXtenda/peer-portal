import React from 'react'
import { useSelector } from 'react-redux';
import { channelNameSelector } from '../features/channel/ChannelSelectors';
import Messages from './Messages';

function Content({handleSeeMenu}) {
  const state = useSelector(channelNameSelector)
  return (
    <div className="col-md-9 content" onClick={()=>handleSeeMenu(false)}>
      <div className="background-image">
        <h1>{state !== "default" ? state : "Select a group to start messaging"}</h1>
        {state !== "default" && <Messages messageSource = {state}/>}
      </div>
      <div style={{position: "fixed",bottom: "0px",left: "45%"}}>
        <form onSubmit={(e)=>console.log("sent")}>
          <input></input>
          <button type="submit">send</button>
        </form>
      </div>
    </div>
  )
}

export default Content