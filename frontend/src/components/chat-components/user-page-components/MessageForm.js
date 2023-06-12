import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { channelChosenSelector } from '../../features/channel/ChannelSelectors';
import { userDataSelector } from '../../features/user/userSelector';
import { sendMessage } from '../../features/user/userSlice';
import '../side-windows/Settings.css';
import './MessageForm.css'

function MessageForm() {
  const chosenChannelState = useSelector(channelChosenSelector);
  const userState = useSelector(userDataSelector);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  function handleMessageSent(e) {
    e.preventDefault();
    const formData = new FormData();
    if (image !== null) {
      formData.append('image', image);
      formData.append('content', content);
      formData.append('channel_id', chosenChannelState.id);
      formData.append('user_id', userState.id);
      formData.append('creator', userState.username);
      setContent('');
      setImage(null);
      dispatch(sendMessage(chosenChannelState.id, formData));
    } 
    else {
      if (content !== "") {
        formData.append('content', content);
        formData.append('channel_id', chosenChannelState.id);
        formData.append('user_id', userState.id);
        formData.append('creator', userState.username);
        setContent('');
        setImage(null);
        dispatch(sendMessage(chosenChannelState.id, formData));
      }
    }

  }

  return (
    <div className="message-send-div">
      <form className='message-send-form' onSubmit={handleMessageSent} encType="multipart/form-data">
        <input
          id="file-message-upload"
          type="file"
          accept="image/*"
          multiple={false}
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label className="file-upload-label" htmlFor="file-message-upload">
          Upload Image
        </label>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <button type="submit">send</button>
      </form>
    </div>
  );
}

export default MessageForm;