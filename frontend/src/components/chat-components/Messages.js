import React, { useState, useEffect } from 'react';
import {cable} from '../features/actioncable';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { useSelector } from 'react-redux';
import { useRef } from 'react';
import './Messages.css';
import {DEFAULT_AVATAR_URL} from '../features/constants'
import { useLocation } from 'react-router-dom';
import { getMessages } from '../features/channel/ChannelSlice';
// import { getMessages } from '../features/channel/ChannelSlice';

const Messages = () => {
  const [messages, setMessages] = useState(new Array());
  const chosenChannelState = useSelector(channelChosenSelector)
  const location = useLocation()
  const path = location.pathname.split('/')[1]
  const channelIdPath = location.pathname.split('/')[2]
  const messageListRef = useRef(null);

  // ActionCable useEffect - realtime messaging data
  useEffect(() => {
    const channel = cable.subscriptions.create(
      { channel: "MessagesChannel", channel_id: chosenChannelState.id },
      {
        connected: () => {console.log("connected")},
        disconnected: () => console.log('disconnected'),
        received: data => {
          if (data) {
            setMessages(data.messages);
          }
        }
      }
    );
    if (path !== "channels") {
      return () => channel.unsubscribe();
    }
  }, [cable, chosenChannelState, setMessages, messages]);

  useEffect(()=>{
    fetch("/channel_messages", {
      method: "POST",
      body: JSON.stringify({"channel_id": chosenChannelState.id}),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((r) => r.json()).then(data=>setMessages(data))
      .catch((error) => {
        console.error(error);
        throw error;
      });
  },[chosenChannelState]);

  return(
    <div className="message-list" ref={messageListRef}>
    {messages.length !== 0 &&
      messages.map((message, index) => (
        <div key={index} className="message-container">
          <img
            className="avatar"
            src={message.url || DEFAULT_AVATAR_URL}
            alt="Avatar"
          />
          <div className="message">
            <div className="header">
              <span className="username">{message.creator}</span>
              <span className="timestamp">{message.created_at.split("T0")[1].split(".")[0]} {message.created_at.split("T0")[0]}</span>
            </div>
            <div className="message-content">{message.content}</div>
            {message.image ? <img src={message.image} alt='message image'/> : null}
          </div>
        </div>
      ))}
  </div>
  );
};

export default Messages;
