import React, { useState } from "react";
import "./Settings.css"
import { useSelector } from "react-redux";
import { userDataSelector } from "../../features/user/userSelector";
import { changeAvatarUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { DEFAULT_AVATAR_URL } from "../../features/constants";
import { settingsTogleAction } from "../../features/settings/SettingsSlice";

function Settings() {
    const userData = useSelector(userDataSelector)
    const [avatar, setAvatar] = useState("")
    const dispatch = useDispatch()
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("avatar", avatar)
        formData.append("user_id", userData.id)
        dispatch(changeAvatarUser(formData))    
    }
    return(
        <div id="settings" data-aos="fade-up">
            <div className="default" onClick={(e)=>dispatch(settingsTogleAction(e.target.className))}>X</div>
            <form onSubmit={handleSubmit}>
                
            <img
            className="img-avatar"
            src={avatar ? URL.createObjectURL(avatar) : userData.avatar ? userData.avatar.url : (DEFAULT_AVATAR_URL)}
            alt="user avatar"
            />
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