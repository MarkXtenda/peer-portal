import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../components/features/counter/counterSlice';
import channelReducer from '../components/features/channel/ChannelSlice';
import messageReducer from '../components/features/message/MessageSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    channel: channelReducer,
    message: messageReducer
  },
});
