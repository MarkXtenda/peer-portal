import React, { useState, useEffect } from 'react';
import {cable} from '../features/actioncable';
import { channelChosenSelector } from '../features/channel/ChannelSelectors';
import { useSelector } from 'react-redux';
import './Messages.css';
import {DEFAULT_AVATAR_URL} from '../features/constants'

const Messages = () => {
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
          console.log(data)
          if (data) {
            if (data.messages.length === 0 || data.messages.length >= 1) {
              // if the new array loaded from a start display it
              setMessages(data.messages);
            }
            else {
              // if message was created add it to array
              setMessages(messages => [...messages, ...data.messages]);
            }
          }
        }
      }
    );
    return () => channel.unsubscribe();
  }, [chosenChannelState, setMessages, messages]);
  console.log(messages)
  return(
    <div className="message-list">
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
