import { setErrors } from '../errors/errorsSlice';
import { fetchChannels, fetchChannelSearch, fetchDeleteChannel, fetchUpdateChannel, fetchCreateChannel, fetchOneChannel, fetchMessages, fetchRemoveUser } from '../fetchFunctions';
import { settingsTogleAction } from '../settings/SettingsSlice';

const initialState = {
  channelCurrent: "default",
  channels: [],
  searchedChannels: [],
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
        return { ...state, channelCurrent: action.payload };
      case "channel/search":
        return {...state, searchedChannels: action.payload};
      case "channel/clear":
        return {...state, searchedChannels: action.payload}
      case "channel/add":
        return { ...state, channels: [...state.channels, action.payload]}
      case "channel/delete":
        const updatedChannels = state.channels.filter(channel => channel.id !== action.payload);
        return { ...state, channels: updatedChannels };
      case "channel/update":
        const updatedChannelIndex = state.channels.findIndex((channel) => channel.id === action.payload.id);
        if (updatedChannelIndex !== -1) {
          const updatedChannels = [...state.channels];
          updatedChannels[updatedChannelIndex] = action.payload;
          return { ...state, channels: updatedChannels };
        }
      case "channel/userRemoved":
        console.log(action.payload)
        const updatedUserRemovedChannelIndex = state.channels.findIndex((channel) => channel.id === action.payload.id);
        console.log(updatedUserRemovedChannelIndex)
        const updatedRemovedChannels = [...state.channels]
        console.log(updatedRemovedChannels)
        updatedRemovedChannels[updatedUserRemovedChannelIndex] = action.payload
        console.log(updatedRemovedChannels)
        return {...state, channels: updatedRemovedChannels, channelCurrent: action.payload}
      case "channel/error":
        console.log(action.payload)
        return {...state, error: action.payload.message}  
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
      dispatch(setErrors(err));
    }
  };
}

export function searchChanels(name) {
  return async function(dispatch) {
    try {
      const searchResult = await fetchChannelSearch(name);
      dispatch({ type: "channel/search", payload: searchResult});
    } catch (err) {
      dispatch(setErrors(err));
    }
  }
}
export function clearSearch() {
  return function(dispatch) {
  dispatch({type: "channel/clear", payload: []})
  }
}

export function deleteChannel(channelId) {
  return async function(dispatch) {
    try {
      const deletedChannelId = await fetchDeleteChannel(channelId);
      dispatch({ type: "channel/delete", payload: deletedChannelId });
      dispatch(chooseChannel("default"))
    } catch (err) {
      dispatch(setErrors(err));
    }
  };
}

export const updateChannel = (channelId, channelData) => {
  return async (dispatch) => {
    try {
      const updatedChannel = await fetchUpdateChannel(channelId, channelData);
      dispatch({ type: "channel/update", payload: updatedChannel });
      dispatch(chooseChannel(updatedChannel))
      dispatch(settingsTogleAction("default"))
    } catch (err) {
      dispatch(setErrors(err));
      // dispatch({ type: "channel/error", payload: err });
    }
  };
};


export function addChannel(channelData) {
  return async function(dispatch) {
    try {
      const createdChannel = await fetchCreateChannel(channelData);
      dispatch({ type: "channel/add", payload: createdChannel });
      dispatch(chooseChannel(createdChannel))
      dispatch(settingsTogleAction("default"))
    } catch (err) {
      dispatch(setErrors(err));
    }
  };
}

export function getOneChannel(channelId) {
  return async function(dispatch) {
    try {
      const channel = await fetchOneChannel(channelId);
      dispatch(chooseChannel(channel))
      dispatch(settingsTogleAction("default"))
    } catch (err) {
      dispatch(setErrors(err));
    }
  };
}

export function getMessages(channelId) {
  return async function() {
    try {
      await fetchMessages(channelId);
    }
    catch (err) {
      console.log(err)
    }
  };
}

export function removeUserAsAdmin(userId, channelId) {
  return async function(dispatch) {
    try {
      const removedUserChannel = await fetchRemoveUser(userId, channelId);
      dispatch(settingsTogleAction("default"))
      dispatch({ type: "channel/userRemoved", payload: removedUserChannel })
    } catch (err) {
      dispatch(setErrors(err));
    }
  };
}