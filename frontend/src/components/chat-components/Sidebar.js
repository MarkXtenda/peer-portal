import React from 'react'
import Channels from './Channels'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchChanels } from '../features/channel/ChannelSlice';
import { settingsSeeMenuAction } from '../features/settings/SettingsSlice';
import { settingsToggleStateSelector, settingsTogleSelector } from '../features/settings/SettingsSelector';
import UpdateChannel from './side-windows/UpdateChannel';
import DeleteChannel from './side-windows/DeleteChannel';
import LeaveChannel from './side-windows/LeaveChannel';
import RemoveUser from './side-windows/RemoveUser';
import { motion } from 'framer-motion';
import { toggleVariants } from '../features/animationVariants';
import "./Sidebar.css"
import DescriptionChannel from './side-windows/DescriptionChannel';

function Sidebar() {
  const toggle = useSelector(settingsTogleSelector)
  const toggleState = useSelector(settingsToggleStateSelector)
  const [name, setChannelname] = useState("")
  const dispatch = useDispatch()
  function handleSearch(e) {
    e.preventDefault();
    dispatch(searchChanels(name))
    }
    
  return (
    <div className="sidebar">
          <div className="sidebar-header">
          <button type="button" className="sidebar-menu-btn" onClick={()=>dispatch(settingsSeeMenuAction())}>
          <div></div>
          <div></div>
          <div></div>
          </button>
            <form onSubmit={handleSearch} className="sidebar-search-form">
              <div className="input-group">
                <input className="form-control" onChange={(e)=>setChannelname(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                {/* <div className="input-group-append">
                  <button className="btn" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div> */}
              </div>
            </form>
          </div>
          <div className="sidebar-channels">
            <Channels/>
          </div>
          <motion.div
            key={toggleState}
            className="toggle-content"
            initial="hidden"
            animate={toggleState ? 'visible' : 'closed'}
            // in theory i can use default state toggle to animate slide out animation
            variants={toggleVariants}>
              {toggle === 'updateChannel' && <UpdateChannel />}
              {toggle === 'deleteChannel' && <DeleteChannel />}
              {toggle === 'leaveChannel' && <LeaveChannel />}
              {toggle === 'usersChannel' && <RemoveUser />}
              {toggle === 'descriptionChannel' && <DescriptionChannel/>}
            </motion.div>
        </div>
  )
}

export default Sidebar