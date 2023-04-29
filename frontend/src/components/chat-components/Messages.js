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

import React, { useEffect, useState } from 'react';
import { connect, disconnect } from '../features/actioncable';

function Messages(props) {
  const [messages, setMessages] = useState([]);

  function handleReceivedMessage(data) {
    setMessages([...messages, data.message]);
  }

  useEffect(() => {
    connect('ChannelMessagesChannel', { received: handleReceivedMessage });
    return () => disconnect();
  }, []);

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id}>{message.content}</div>
      ))}
    </div>
  );
}

export default Messages;
