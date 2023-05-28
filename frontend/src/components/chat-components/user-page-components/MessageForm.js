import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector } from '../../features/channel/ChannelSelectors';
import { userDataSelector } from '../../features/user/userSelector';
import { sendMessage } from '../../features/user/userSlice';

function MessageForm() {
    const chosenChannelState = useSelector(channelChosenSelector)
    const userState = useSelector(userDataSelector)
    const [content, setContent] = useState("")
    const [image, setImage] = useState(null)
    const dispatch = useDispatch()
    function handleMessageSent(e) {
        e.preventDefault();
        console.log('handleMessageSent called');
        const formData = new FormData()
        if (image !== null) {
          formData.append("image", image)
          formData.append("content", content)
        }
        else {
          formData.append("content", content)
        }
        formData.append("channel_id", chosenChannelState.id)
        formData.append("user_id", userState.id)
        formData.append("creator", userState.username)
        setContent("")
        setImage(null)
        dispatch(sendMessage(chosenChannelState.id, formData))
    }
    
    return (
    <div style={{position: "fixed",bottom: "0px",left: "45%"}}>
        <form onSubmit={handleMessageSent} encType="multipart/form-data">
            <input
            type="file"
            accept="image/*"
            multiple={false}
            onChange={(e)=>setImage(e.target.files[0])}
            />
            <input type="text" value={content} onChange={(e) => setContent(e.target.value)}></input>
            <button type="submit">send</button>
        </form>
    </div>
  )
}

export default MessageForm