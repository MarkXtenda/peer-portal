import React from 'react';
import Sidebar from './Sidebar';
import HomePageContent from './HomePageContent';
import Menu from './Menu';
import { useState } from 'react';
import './UserPage.css';
import SearchChannel from './SearchChannel';
import { useSelector } from 'react-redux';
import { channelSearchSelector } from '../features/channel/ChannelSelectors';
import { settingsSeeMenuSelector } from '../features/settings/SettingsSelector';
import { motion } from 'framer-motion';
import { menuVariants } from '../features/animationVariants';

function HomePage() {
  const seeMenu = useSelector(settingsSeeMenuSelector)
  const [search, setSearch] = useState([])
  const channelSearch = useSelector(channelSearchSelector)

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
          <HomePageContent/>
      </div>
    </div>
  );
}

export default HomePage;
