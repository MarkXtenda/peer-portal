import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Sidebar from './Sidebar';
import Content from './Content';
import Menu from './Menu';
import { useState } from 'react';
import Settings from './Settings';
import './UserPage.css';

function ChannelComponent() {
  const [seeMenu, setSeeMenu] = useState(false)
  return (
    <div className="container-fluid">
      <div className="row">
        {seeMenu && <Menu/>}
        <Sidebar hide={seeMenu} handleSeeMenu={setSeeMenu}/>
        <Content handleSeeMenu={setSeeMenu}/>
      </div>
      <Settings/>
    </div>
  );
}

export default ChannelComponent;
