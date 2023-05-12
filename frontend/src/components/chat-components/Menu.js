import React, {useState} from 'react'
import { logoutUser } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Settings from './Settings';

function Menu() {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false)

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
          <ul className="list-ustyled">
            <li><a href="#">Create New Group</a></li>
            <li><a href="#">Create New Channel</a></li>
            <li><a href="#" onClick={()=>{setIsVisible(!isVisible)}}>Settings</a></li>
            <li><a href="#">Night Mode</a></li>
            <li><a href="#" onClick={handleLogout}>Logout</a></li>
          </ul>
          {isVisible && <Settings setIsVisible={setIsVisible}/>}
        </div>
  )
}

export default Menu