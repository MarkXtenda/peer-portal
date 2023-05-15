import React, {useState} from 'react'
import { logoutUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Settings from './side-windows/Settings';
import { userDataSelector } from '../features/user/userSelector';
import CreateChannel from './side-windows/CreateChannel';
import { settingsTogleAction } from '../features/settings/SettingsSlice';
import { settingsTogleSelector } from '../features/settings/SettingsSelector';

function Menu() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const userData = useSelector(userDataSelector)
  const togle = useSelector(settingsTogleSelector)
  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser())
    navigate("/login", { replace: true })
  }
  return (
    <div className="col-md-3 sidebar">
          <div className="sidebar-header d-flex">
                <h1>{userData.username}</h1>
          </div>
          <ul className="list-ustyled">
            <li><a href="#">Create New Group</a></li>
            <li><a className='createChannel' href="#" onClick={(e)=>{dispatch(settingsTogleAction(e.target.className))}}>Create New Channel</a></li>
            <li><a className='settings' href="#" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>Settings</a></li>
            <li><a className='nightMode' href="#" onClick={(e)=>{dispatch(settingsTogleAction(e.target.className))}}>Night Mode</a></li>
            <li><a href="#" onClick={handleLogout}>Logout</a></li>
          </ul>
          {
          ({ 
            createChannel: <CreateChannel/>,
            settings: <Settings/>,
            nightMode: <div>nightmode</div>
          })[togle]
          }
        </div>
  )
}

export default Menu