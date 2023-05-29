import React, { useEffect } from 'react'
import logo from "./logo.svg"
import { useSelector, useDispatch } from 'react-redux';
import {chooseChannel} from "../features/channel/ChannelSlice"
import { channelChosenSelector, channelSelector } from '../features/channel/ChannelSelectors';
import { showChannels } from '../features/channel/ChannelSlice';
import './Channels.css';

function Channels() {
  const state = useSelector(channelSelector)
  const dispatch = useDispatch()
  const chosenChannelState = useSelector(channelChosenSelector)
  // stylyng applied to the react
  function handleChannelClick(e, channel) {
    e.preventDefault()
    dispatch(chooseChannel(channel))
    console.log(channel)
  }
  useEffect(()=>{
    dispatch(showChannels())
  },[])
  return (
    <div className="sidebar-body">
            <ul className="list-unstyled">
              {state.length !== 0 && state.map((channel, index)=>
              <li style={{height: "50px"}} key={index} className={channel.name === chosenChannelState.name ? "chosen" : null}><img style={{height: "50px", width: "50px", borderRadius: "50%", float: "left"}} src={channel.image ? channel.image : logo} /><a key={index+1} name={channel.name} href='#' onClick={(e)=>handleChannelClick(e, channel)}>{channel.name}</a></li>
              )}
            </ul>
          </div>
  )
}

export default Channels