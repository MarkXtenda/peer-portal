import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {chooseChannel} from "../features/channel/ChannelSlice"
import { channelSelector } from '../features/channel/ChannelSelectors';
import { showChannels } from '../features/channel/ChannelSlice';
function Channels() {
  const state = useSelector(channelSelector)
  const dispatch = useDispatch()

  function handleChannelClick(e) {
    e.preventDefault()
    dispatch(chooseChannel(e.target.name))
  }
  useEffect(()=>{
    dispatch(showChannels())
  },[])
  return (
    <div className="sidebar-body">
            <ul className="list-unstyled">
              {state.length !== 0 && state.map((channel, index)=>
              <li key={index}><a key={index+1} name={channel.name} href='#' onClick={(e)=>handleChannelClick(e)}>{channel.name}</a></li>
              )}
            </ul>
          </div>
  )
}

export default Channels