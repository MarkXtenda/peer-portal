import { chooseChannel } from '../channel/ChannelSlice';
import { setErrors } from '../errors/errorsSlice';
import { fetchLogin, fetchLogout, fetchAvatar, fetchSendMessage, fetchRemoveUser, fetchJoinChannel, fetchSignup} from '../fetchFunctions';
import { settingsHideMenuAction, settingsTogleAction } from '../settings/SettingsSlice';

const initialStateUser = {
    isLoggedIn: false,
    user: {
      id: null,
      usernamae: null,
      channels: [],
      avatar: {
        url: "default"
      }
    },
    error: null,
};

export const userLogout = (response) => {
  return {
    type: "user/logout",
    payload: response
  }
}

export default function userReducer(state = initialStateUser, action) {
    switch (action.type) {
        case "user/login":
          return {...state, isLoggedIn: true, user: action.payload, error: null };
        case "user/error":
          return {...state, isLoggedIn: false, user: null, error: action.payload.message };
        case "user/logout":
          return {...state, isLoggedIn: false, user: null,  error: null };
        case "user/avatar":
          const updatedUser = {
            ...state.user,
            avatar: {
              url: action.payload.url
            }
          };
          return {...state, user: updatedUser};
        case "user/channels/add":
          const addedUserChannels = {...state.user, channels: [...state.user.channels, action.payload]}
          return {...state, user: addedUserChannels};
        case "user/channels/remove":
          const updatedChannels = state.user.channels.filter(channel => channel.id !== action.payload);
          const updatedUserChannels = {...state.user, channels:  updatedChannels}
          return {...state, user: updatedUserChannels};
        default:
          return state;
      }
}

export function loginUser(email, password) {
    return async function(dispatch) {
      try {
        const user = await fetchLogin(email, password);
        dispatch(settingsHideMenuAction())
        dispatch({ type: "user/login", payload: user });
      }
      catch (err) {
        dispatch(setErrors(err));
      }
    };
  }

  export function signupUser(userData) {
    return async function(dispatch) {
      try {
        const user = await fetchSignup(userData);
        dispatch({ type: "user/login", payload: user });
      } catch (err) {
        dispatch(setErrors(err));
      }
    };
  }
  

export function logoutUser() {
  return async function(dispatch) {
    try {
      await fetchLogout();
      dispatch({ type: "user/logout", payload: null });
      dispatch(chooseChannel("default"))
    } catch (err) {
      dispatch(setErrors(err));
    }
  };
}

export function changeAvatarUser(formData) {
  return async function(dispatch) {
    try {
      const avatar = await fetchAvatar(formData);
      dispatch(settingsTogleAction("settings"))
      dispatch({ type: "user/avatar", payload: avatar});
    } catch (err) {
      dispatch(setErrors(err));
    }
  }
}

export function sendMessage(channelId, messageData) {
  return async function() {
    try {
      await fetchSendMessage(channelId, messageData);
    }
    catch (err) {
      console.log(err)
    }
    
  }
}

export function removeUser(userId, channelId) {
  return async function(dispatch) {
    try {
      const removedUserChannel = await fetchRemoveUser(userId, channelId);
      dispatch(chooseChannel("default"))
      dispatch(settingsTogleAction("default"))
      // ATTENTION
      dispatch({ type: "channel/delete", payload: removedUserChannel.id })
      dispatch({ type: "user/channels/remove", payload: removedUserChannel.id})
    } catch (err) {
      dispatch(setErrors(err));
    }
  };
}

export function addUser(userId, channelId) {
  return async function(dispatch) {
    try {
      const addededUserChannel = await fetchJoinChannel(userId, channelId);
      dispatch(chooseChannel(addededUserChannel))
      dispatch(settingsTogleAction("default"))
      dispatch({ type: "channel/add", payload: addededUserChannel })
      dispatch({ type: "user/channels/add", payload: addededUserChannel})
    } catch (err) {
      dispatch(setErrors(err));
    }
  };
}