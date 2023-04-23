import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {chooseChannel, ChannelSlice} from "./ChannelSlice"
import { useEffect } from 'react';
function Channel() {
    const state = useSelector((state)=>state.channel)
    const dispatch = useDispatch()
    
  return (
    <div></div>
  )
}

export default Channel