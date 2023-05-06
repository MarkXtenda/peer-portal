// import React from 'react'
// import { messagesMessageSelector } from '../features/message/MessageSelectors'
// import { useSelector } from 'react-redux'

// function Messages({messageSource}) {
//     const messageState = useSelector(messagesMessageSelector)
//   return (
//     <div>{messageState.find((message)=>message.name === messageSource).message}</div>
//   )
// }

// export default Messages

// import React, { useEffect, useState } from 'react';
// import { connect, disconnect } from '../features/actioncable';

// function Messages(props) {
//   const [messages, setMessages] = useState([]);

//   function handleReceivedMessage(data) {
//     setMessages([...messages, data.message]);
//   }

//   useEffect(() => {
//     connect('Admin Channel', { received: handleReceivedMessage });
//     return () => disconnect();
//   }, []);

//   return (
//     <div>
//       {messages.map((message) => (
//         <div key={message.id}>{message.content}</div>
//       ))}
//     </div>
//   );
// }

// export default Messages;

import React, { useState, useEffect } from 'react';
import {cable} from '../features/actioncable';

const Messages = ({ channelId }) => {
  const [messages, setMessages] = useState(new Array());
  // ActionCable useEffect - realtime messaging data
  useEffect(() => {
    const channel = cable.subscriptions.create(
      { channel: "ChatChannel", channel_id: channelId.toString() },
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
            setMessages(messages => [...messages, data.messages]);
          }
          }
      }
    );
    return () => channel.unsubscribe();
  }, [channelId, messages]);
  console.log("Messages: ", messages)
  return(
    <div>
      {messages.length !== 0 && messages.map((message, index)=><p key={index}>User: {message.creator} Message: {message.content}</p>)}
    </div>
  );
};

export default Messages;
