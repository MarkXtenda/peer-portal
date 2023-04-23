import React from 'react'
import Channels from './Channels'

function Sidebar({hide, handleSeeMenu}) {
  return (
    <div className="col-md-3 sidebar" style={{display: hide ? "none" : "block"}}>
          <div className="sidebar-header d-flex">
          <button type="button" className="btn-dark btn-dark" onClick={()=>handleSeeMenu(true)}>M</button>
            <form className="form-inline ml-3">
              <div className="input-group input-group-sm">
                <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                <div className="input-group-append">
                  <button className="btn btn-navbar" type="submit">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <Channels/>
        </div>
  )
}

export default Sidebar