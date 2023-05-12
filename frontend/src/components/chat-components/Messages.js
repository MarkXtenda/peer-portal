import React, { useState, useEffect } from 'react';
import {cable} from '../features/actioncable';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { useSelector } from 'react-redux';
import './Messages.css';

const Messages = () => {
  const DEFAULT_AVATAR_URL = 'https://i.imgur.com/6VBx3io.png';
  const [messages, setMessages] = useState(new Array());
  const chosenChannelState = useSelector(channelChosenSelector)

  // ActionCable useEffect - realtime messaging data
  useEffect(() => {
    const channel = cable.subscriptions.create(
      { channel: "ChatChannel", channel_id: chosenChannelState.id },
      {
        connected: () => console.log('connected'),
        disconnected: () => console.log('disconnected'),
        // !!! Need some work on handling created array
        received: data => {
          if (data.messages.length >= 1 ) {
            // if the new array loaded from a start display it
            setMessages(data.messages);
          }
          else {
            // if message was created add it to array
            setMessages(data.messages);
            // setMessages(messages => [...messages, data.messages]);
          }
          }
      }
    );
    return () => channel.unsubscribe();
  }, [chosenChannelState, messages]);
  console.log("Messages: ", messages)
  return(
    // <div>
    //   {messages.length !== 0 && messages.map((message, index)=><p key={index}>User: {message.creator} Message: {message.content}</p>)}
    // </div>
    <div className="message-list">
    {messages.length !== 0 &&
      messages.map((message, index) => (
        <div key={index} className="message-container">
          <img
            className="avatar"
            src={message.avatar || DEFAULT_AVATAR_URL}
            alt="Avatar"
          />
          <div className="message">
            <div className="header">
              <span className="username">{message.creator}</span>
              <span className="timestamp">{message.created_at}</span>
            </div>
            <div className="content">{message.content}</div>
          </div>
        </div>
      ))}
  </div>
  );
};

export default Messages;
