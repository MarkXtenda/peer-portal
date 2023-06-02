import React from 'react'
import Channels from './Channels'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchChanels } from '../features/channel/ChannelSlice';
import { settingsSeeMenuAction } from '../features/settings/SettingsSlice';
import { settingsSeeMenuSelector, settingsTogleSelector } from '../features/settings/SettingsSelector';
import UpdateChannel from './side-windows/UpdateChannel';
import DeleteChannel from './side-windows/DeleteChannel';
import LeaveChannel from './side-windows/LeaveChannel';
import RemoveUser from './side-windows/RemoveUser';
import { motion } from 'framer-motion';


function Sidebar() {
  const toggle = useSelector(settingsTogleSelector)
  const [name, setChannelname] = useState("")
  const dispatch = useDispatch()
  const hideMenu = useSelector(settingsSeeMenuSelector)
  function handleSearch(e) {
    e.preventDefault();
    dispatch(searchChanels(name))
    }

  const toggleVariants = {
    hidden: {
      x: '-100%',
    },
    visible: {
      x: 0,
    },
  };
  return (
    <div className="col-md-3 sidebar" style={{display: hideMenu ? "none" : "block"}}>
          <div className="sidebar-header d-flex">
          <button type="button" className="btn-dark btn-dark" onClick={()=>dispatch(settingsSeeMenuAction())}>M</button>
            <form onSubmit={handleSearch} className="form-inline ml-3">
              <div className="input-group input-group-sm">
                <input className="form-control form-control-navbar" onChange={(e)=>setChannelname(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Channels/>
          <motion.div
            key={toggle}
            className="toggle-content"
            initial="hidden"
            animate={toggle !== "default" ? 'visible' : 'hidden'}
            variants={toggleVariants}
          >
            {toggle === 'updateChannel' && <UpdateChannel />}
            {toggle === 'deleteChannel' && <DeleteChannel />}
            {toggle === 'leaveChannel' && <LeaveChannel />}
            {toggle === 'usersChannel' && <RemoveUser />}
          </motion.div>
          {/* {
          ({ 
            updateChannel: <UpdateChannel/>,
            deleteChannel: <DeleteChannel/>,
            leaveChannel: <LeaveChannel/>,
            usersChannel: <RemoveUser/>,
          })[toggle]
          } */}
        </div>
  )
}

export default Sidebar