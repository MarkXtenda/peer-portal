import { configureStore } from '@reduxjs/toolkit';
import channelReducer from '../components/features/channel/ChannelSlice';
import messageReducer from '../components/features/message/MessageSlice';
import userReducer from '../components/features/user/userSlice'

export const store = configureStore({
  reducer: {
    channel: channelReducer,
    message: messageReducer,
    user: userReducer
  },
});
