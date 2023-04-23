import React from 'react'
import { messagesMessageSelector } from '../features/message/MessageSelectors'
import { useSelector } from 'react-redux'

function Messages({messageSource}) {
    const messageState = useSelector(messagesMessageSelector)
  return (
    <div>{messageState.find((message)=>message.name === messageSource).message}</div>
  )
}

export default Messages