import React, { useState } from "react";
import logo from "./logo.svg"
import "./Settings.css"
import { useSelector } from "react-redux";
import { userAvatarSelector } from "../features/user/userSelector";
import { changeAvatarUser } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

function Settings({setIsVisible}) {
    const userAvatar = useSelector(userAvatarSelector)
    const [avatar, setAvatar] = useState(userAvatar)
    const dispatch = useDispatch()
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("avatar", avatar)
        dispatch(changeAvatarUser(formData))    
    }
    return(
        <div id="settings">
            <div onClick={()=>setIsVisible(false)}>X</div>
            <form onSubmit={handleSubmit}>
            {avatar && (
            <img
            className="img-avatar"
            src={userAvatar}
            alt="user avatar"
            />
            )}
            <label>Profile Image</label>
            <input
            type="file"
            accept="image/*" /// for images
            multiple={false}
            onChange={(e)=>setAvatar(e.target.files[0])}
            />
            <input type="submit"></input>
            </form>
        </div>
    );
}

export default Settings