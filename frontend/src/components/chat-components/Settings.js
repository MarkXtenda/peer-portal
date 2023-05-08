import React, { useState } from "react";
import logo from "./logo.svg"
import "./Settings.css"
import { useSelector } from "react-redux";
import { userAvatarSelector } from "../features/user/userSelector";

function Settings() {
    const userAvatar = useSelector(userAvatarSelector)
    const [avatar, setAvatar] = useState(userAvatar)
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    function handleSubmit(e) {
        e.preventDefault()
        const formData = new FormData()
        formData.append("avatar", avatar)
        fetch("/avatars", {
            method: "POST",
            body: formData
        })
        .then(res => res.json()).then(data=>console.log(data))
        .catch(error => {
            console.log(error);
        });
    }
    return(
        <div id="settings">
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