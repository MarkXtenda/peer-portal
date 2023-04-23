import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {chooseChannel} from "../features/channel/ChannelSlice"
import { channelSelector } from '../features/channel/ChannelSelectors';
function Channels() {
  const state = useSelector(channelSelector)
  const dispatch = useDispatch()
  return (
    <div className="sidebar-body">
            <ul className="list-unstyled">
              {state.map((channel, index)=>
              <li key={index}><a key={index+1} href='#' name={channel} onClick={(e)=>dispatch(chooseChannel(e.target.name))}>{channel}</a></li>
              )}
            </ul>
          </div>
  )
}

export default Channels