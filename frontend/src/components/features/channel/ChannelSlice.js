import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchChannels } from '../fetchFunctions';

const initialState = {
  channelCurrent: "default",
  channels: [],
};

export const chooseChannel = (channel) => {
  return {
    type: "channel/choose",
    payload: channel
  }
}

export default function channelReducer(state = initialState, action) {
    switch (action.type) {
      case "channel/load":
        return { ...state, channels: action.payload}
      case "channel/choose":
        const choosenChannel = state.channels.find(element => element.name === action.payload)
        return { ...state, channelCurrent: choosenChannel };
      case "channel/search":
        const searchedChannelsArray = state.channels.filter((channel)=>channel.name===action.payload)
        return {...state, channels: searchedChannelsArray};
      case "channel/add":
        const addChannelArray = state.channels.push(action.payload)
        return {...state, channels: addChannelArray}
      case "channel/error":
        return {...state, error: action.payload}  
      default:
        return state;
      }
}

export function showChannels() {
  return async function(dispatch) {
    try {
      const channels = await fetchChannels();
      dispatch({ type: "channel/load", payload: channels });
    } catch (err) {
      dispatch({ type: "channel/error", payload: err });
    }
  };
}