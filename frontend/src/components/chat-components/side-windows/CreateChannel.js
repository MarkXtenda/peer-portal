import React from 'react'
import { useState } from 'react'
import { DEFAULT_CHANNEL_URL } from '../../features/constants'
import "./Settings.css"
import { settingsTogleAction } from '../../features/settings/SettingsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { userDataSelector } from '../../features/user/userSelector'

function CreateChannel() {
  const userState = useSelector(userDataSelector)
  const [avatar, setAvatar] = useState("")
  const dispatch = useDispatch()
  function handleSubmit(e) {
    e.preventDefault()
    console.log("submitted")
  }

  return (
    <div id='settings'>
      <div className="default" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>X</div>
      <form onSubmit={handleSubmit}>
        <img
        className="img-avatar"
        src={avatar ? URL.createObjectURL(avatar) : DEFAULT_CHANNEL_URL}
        alt="user avatar"
        />
        <label>Channel Image</label>
        <input
        type="file"
        accept="image/*" /// for images
        multiple={false}
        onChange={(e)=>setAvatar(e.target.files[0])}
        />
        <label>Channel Name:</label>
        <input></input>
        <label>Channel Description</label>
        <input></input>
        <p>Channel Creator: {userState.username} (you)</p>
        <input type="submit"></input>
      </form>
    </div>
  )
}

export default CreateChannel