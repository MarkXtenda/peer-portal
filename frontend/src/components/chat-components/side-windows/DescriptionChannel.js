import React, { useState } from "react";
import "./Settings.css";
import { useSelector } from "react-redux";
import { userDataSelector } from "../../features/user/userSelector";
import { changeAvatarUser } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";
import { DEFAULT_AVATAR_URL, DEFAULT_CHANNEL_URL } from "../../features/constants";
import { settingsTogleAction } from "../../features/settings/SettingsSlice";
import { channelChosenSelector } from "../../features/channel/ChannelSelectors";

function DescriptionChannel() {
  const channelData = useSelector(channelChosenSelector);
  const dispatch = useDispatch();

  return (
    <div id="descriptionChannel" className="more-channel-options">
      <div className="default" onClick={()=>dispatch(settingsTogleAction("descriptionChannel"))}>
        <span></span>
        <span></span>
      </div>
        <div className="form-container">
          <img
            className="img-avatar"
            src={
                channelData.image
                ? channelData.image
                : DEFAULT_CHANNEL_URL
            }
            alt="channel avatar"
          />
        </div>
        <h2>{channelData.name}</h2>
        <div className="file-input-container">
            <h4>The channel is {channelData.private ? "private" : "public"}</h4>
            <p>Description: {channelData.description}</p>
        </div>
    </div>
  );
}

export default DescriptionChannel;
