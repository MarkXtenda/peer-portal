import React from 'react'

function Menu() {
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
          </ul>
        </div>
  )
}

export default Menu