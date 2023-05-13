import React from 'react'
import Channels from './Channels'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchChanels } from '../features/channel/ChannelSlice';

function Sidebar({hide, handleSeeMenu}) {
  const [name, setChannelname] = useState("")
  const dispatch = useDispatch()
  function handleSearch(e) {
    e.preventDefault();
    dispatch(searchChanels(name))
    }

  return (
    <div className="col-md-3 sidebar" style={{display: hide ? "none" : "block"}}>
          <div className="sidebar-header d-flex">
          <button type="button" className="btn-dark btn-dark" onClick={()=>handleSeeMenu(true)}>M</button>
            <form onSubmit={handleSearch} className="form-inline ml-3">
              <div className="input-group input-group-sm">
                <input className="form-control form-control-navbar" onChange={(e)=>setChannelname(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
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