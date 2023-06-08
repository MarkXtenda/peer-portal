import React from 'react';
import { logoutUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userDataSelector } from '../features/user/userSelector';
import { settingsTogleAction } from '../features/settings/SettingsSlice';
import MenuOptions from './MenuOptions';
import "./Menu.css"

function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(userDataSelector);

  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser());
    navigate('/login', { replace: true });
  }

  const handleToggle = (e, className) => {
    e.preventDefault();
    dispatch(settingsTogleAction(className));
  };

  return (
    <div className="menu-container">
      <div className="sidebar-header">
        <h1>{userData.username}</h1>
      </div>
      <ul className="menu-list">
        <li>
          <a
            className="menu-item createChannel"
            href="#"
            onClick={(e) => handleToggle(e, 'createChannel')}
          >
            Create New Channel
          </a>
        </li>
        <li>
          <a
            className="menu-item settings"
            href="#"
            onClick={(e) => handleToggle(e, 'settings')}
          >
            Settings
          </a>
        </li>
        <li>
          <a
            className="menu-item nightMode"
            href="#"
            onClick={(e) => handleToggle(e, 'nightMode')}
          >
            Night Mode
          </a>
        </li>
        <li>
          <a href="#" className="menu-item logout" onClick={handleLogout}>
            Logout
          </a>
        </li>
      </ul>
      <MenuOptions/>
    </div>
  );
}

export default Menu;
