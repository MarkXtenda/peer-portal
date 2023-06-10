import React, { useEffect } from 'react'
import logo from "./logo.svg"
import { Link } from 'react-router-dom';
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
    dispatch(chooseChannel(channel))
  }
  function handleLongStrings(string) {
    if (string.length >= 25) {
      return string.substring(0,19).concat("...");
    } else {
      return string;
    }
  }
  useEffect(()=>{
    dispatch(showChannels())
  },[])
  return (
    <div className="sidebar-body">
            <ul className="channel-list">
              {state.length !== 0 && state.map((channel, index)=>
              <li style={{height: "50px"}} key={index} className={channel.name === chosenChannelState.name ? "chosen" : null}>
                <Link to={`/channels/${channel.id}`} onClick={(e)=>handleChannelClick(e, channel)}>
                  <img style={{height: "50px", width: "50px", borderRadius: "50%", float: "left"}} src={channel.image ? channel.image : logo}></img>
                  <div key={index+1} name={channel.name}>{handleLongStrings(channel.name)}</div>
                </Link>
              </li>
              )}
            </ul>
          </div>
  )
}

export default Channels