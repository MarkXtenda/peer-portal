import React from 'react'
import { logoutUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    dispatch(logoutUser())
    navigate("/login", { replace: true })
  }
  return (
    <div className="col-md-3 sidebar">
          <div className="sidebar-header d-flex">
                <h1>User</h1>
          </div>
          <ul className="list-unstyled">
            <li><a href="#">Create New Group</a></li>
            <li><a href="#">Create New Channel</a></li>
            <li><a href="#">Settings</a></li>
            <li><a href="#">Night Mode</a></li>
            <li><a href="#" onClick={handleLogout}>Logout</a></li>
          </ul>
        </div>
  )
}

export default Menu