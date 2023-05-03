// react-frontend/src/ChatBox.js
import React, { useEffect } from 'react';
import consumer from '../features/cable';

function ChatBox({channelId}) {
  const state = {
    content: 'Hi!',
    username: 'cool_kid_20'
  }
  const handleSubmit = () => {
    fetch('http://localhost:3001/messages', {
      method: 'POST',
      body: JSON.stringify(state)
    })
  } 

  useEffect(()=>{
    consumer.subscriptions.create({
      channel: 'ChatChannel',
      username: 'cool_kid_20',
    }, {
      connected: () => console.log('connected'),
      disconnected: () => console.log('disconnected'),
      received: data => console.log(data),
    })
    return () => consumer.disconnect()
  },[channelId])  
};

export default ChatBox