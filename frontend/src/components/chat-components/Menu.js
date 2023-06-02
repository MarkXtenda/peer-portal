import React, { useState } from 'react';
import { logoutUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Settings from './side-windows/Settings';
import { userDataSelector } from '../features/user/userSelector';
import CreateChannel from './side-windows/CreateChannel';
import { settingsTogleAction } from '../features/settings/SettingsSlice';
import { settingsSeeMenuSelector, settingsTogleSelector } from '../features/settings/SettingsSelector';

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(userDataSelector);
  const toggle = useSelector(settingsTogleSelector);
  const seeMenu = useSelector(settingsSeeMenuSelector);

  const [isToggled, setIsToggled] = useState(false);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/login', { replace: true });
  }

  const toggleVariants = {
    hidden: {
      x: '-100%',
    },
    visible: {
      x: 0,
    },
  };

  const handleToggle = (e, className) => {
    e.preventDefault();
    dispatch(settingsTogleAction(className));
    setIsToggled(!isToggled);
  };

  return (
    <div className="col-md-3 sidebar">
      <div className="sidebar-header d-flex">
        <h1>{userData.username}</h1>
      </div>
      <ul className="list-ustyled">
        <li>
          <a
            className="createChannel"
            href="#"
            onClick={(e) => handleToggle(e, 'createChannel')}
          >
            Create New Channel
          </a>
        </li>
        <li>
          <a
            className="settings"
            href="#"
            onClick={(e) => handleToggle(e, 'settings')}
          >
            Settings
          </a>
        </li>
        <li>
          <a
            className="nightMode"
            href="#"
            onClick={(e) => handleToggle(e, 'nightMode')}
          >
            Night Mode
          </a>
        </li>
        <li>
          <a href="#" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
      <motion.div
        key={toggle}
        className="toggle-content"
        initial="hidden"
        animate={toggle !== "default" ? 'visible' : 'hidden'}
        variants={toggleVariants}
      >
        {toggle === 'createChannel' && <CreateChannel />}
        {toggle === 'settings' && <Settings />}
        {toggle === 'nightMode' && <div>Night Mode</div>}
      </motion.div>
    </div>
  );
}

export default Menu;
