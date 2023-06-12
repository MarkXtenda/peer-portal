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
        // let choosenChannel = "default"
        // if (action.payload !== choosenChannel) {
        //   choosenChannel = state.channels.find(element => element.name === action.payload.name)
        // }
        // getMessages(channelId)
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
        // ATTENTION NEEDED
        const updatedChannelIndex = state.channels.findIndex((channel) => channel.id === action.payload.id);
        if (updatedChannelIndex !== -1) {
          const updatedChannels = [...state.channels];
          updatedChannels[updatedChannelIndex] = action.payload;
          return { ...state, channels: updatedChannels };
        }
      case "channel/userRemoved":
        console.log(action.payload)
        const updatedUserRemovedChannelIndex = state.channels.findIndex((channel) => channel.id === action.payload.id);
        updatedChannels[updatedUserRemovedChannelIndex] = action.payload
        console.log(updatedChannels)
        // return {...state, channels: updatedChannels}

      // case "channel/userRemoved":
      //   if (action.payload) {
      //     const removedUserArray = state.channelCurrent
      //     removedUserArray.users_info.filter((user)=>user.username !== action.payload)
      //     return { ...state, channels: updatedChannels };
      //   }
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

export function searchChanels(name) {
  return async function(dispatch) {
    try {
      const searchResult = await fetchChannelSearch(name);
      dispatch({ type: "channel/search", payload: searchResult});
    } catch (err) {
      dispatch({type: "channel/error", payload: err})
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
      dispatch({ type: "channel/error", payload: err });
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
      console.log(err)
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
      dispatch({ type: "channel/error", payload: err });
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
      dispatch({ type: "channel/error", payload: err });
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
      dispatch({ type: "user/error", payload: err });
    }
  };
}