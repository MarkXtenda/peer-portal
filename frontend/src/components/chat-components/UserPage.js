import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Sidebar from './Sidebar';
import Content from './Content';
import Menu from './Menu';
import { useState } from 'react';
import './UserPage.css';
import SearchChannel from './SearchChannel';
import { useSelector } from 'react-redux';
import { channelSearchSelector } from '../features/channel/ChannelSelectors';

function ChannelComponent() {
  const [seeMenu, setSeeMenu] = useState(false)
  const [search, setSearch] = useState([])
  const channelSearch = useSelector(channelSearchSelector)
  console.log(search)
  return (
    <div className="container-fluid">
      <div className="row">
        {seeMenu && <Menu/>}
        <Sidebar hide={seeMenu} handleSeeMenu={setSeeMenu} onSearch={setSearch}/>
        {channelSearch.length > 0 && <SearchChannel users={search} clearSearch={setSearch}></SearchChannel>}
        <Content handleSeeMenu={setSeeMenu}/>
      </div>
    </div>
  );
}

export default ChannelComponent;
