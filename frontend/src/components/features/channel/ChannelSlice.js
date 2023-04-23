import { createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  channelName: "default",
  channels: ["Group 1", "Group 2", "Group 3"],
  messages: [
    {name: "Group 1", message: "Hello Group 1"},
    {name: "Group 2", message: "Hello Group 2"},
    {name: "Group 3", message: "Hello Group 3"}]
};

export const chooseChannel = (channel) => {
  return {
    type: "channel/choose",
    payload: channel
  }
}


export default function channelReducer(state = initialState, action) {
    switch (action.type) {
        case "channel/choose":
          return { ...state, channelName: action.payload };
        case "channel/search":
          const searchedChannelsArray = state.channels.filter((channel)=>channel.name===action.payload)
          return {...state, channels: searchedChannelsArray};
        case "channel/add":
          const addChannelArray = state.channels.push(action.payload)
          return {...state, channels: addChannelArray}
        default:
          return state;
      }
    
}