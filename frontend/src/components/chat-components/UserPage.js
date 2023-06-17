import React, { useEffect } from 'react';
import Sidebar from './Sidebar';
import Content from './Content';
import Menu from './Menu';
import { useState } from 'react';
import './UserPage.css';
import SearchChannel from './SearchChannel';
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector, channelSearchSelector } from '../features/channel/ChannelSelectors';
import { settingsSeeMenuSelector } from '../features/settings/SettingsSelector';
import { motion } from 'framer-motion';
import { menuVariants } from '../features/animationVariants';
import { getOneChannel } from '../features/channel/ChannelSlice';

function UserPage({channelId}) {
  const seeMenu = useSelector(settingsSeeMenuSelector)
  const [search, setSearch] = useState([])
  const channelSearch = useSelector(channelSearchSelector)
  const chosenChannel = useSelector(channelChosenSelector)
  const dispatch = useDispatch()

  useEffect(()=>{
      if (chosenChannel === "default") {
        dispatch(getOneChannel(channelId))
      }
  },[])

  return (
    <div className="container-fluid">
      <motion.div
      className="toggle-content"
      initial="hidden"
      animate={seeMenu ? 'visible' : 'hidden'}
      variants={menuVariants}>
        <Menu/>
      </motion.div>
      <div className="row">
        <Sidebar onSearch={setSearch}/>
        {channelSearch.length > 0 && <SearchChannel users={search} clearSearch={setSearch}></SearchChannel>}
          <Content/>
      </div>
    </div>
  );
}

export default UserPage;
