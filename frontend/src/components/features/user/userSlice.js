import { chooseChannel } from '../channel/ChannelSlice';
import { fetchLogin, fetchLogout, fetchAvatar, fetchSendMessage, fetchRemoveUser} from '../fetchFunctions';

const initialStateUser = {
    isLoggedIn: false,
    user: {
      id: null,
      usernamae: null,
      channel: [],
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
          return {...state, isLoggedIn: false, user: null, error: action.payload };
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
        default:
          return state;
      }
}

export function loginUser(email, password) {
    return async function(dispatch) {
      try {
        const user = await fetchLogin(email, password);
        dispatch({ type: "user/login", payload: user });
      } catch (err) {
        dispatch({ type: "user/error", payload: err });
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
      dispatch({ type: "user/error", payload: err });
    }
  };
}

export function changeAvatarUser(formData) {
  return async function(dispatch) {
    try {
      const avatar = await fetchAvatar(formData);
      dispatch({ type: "user/avatar", payload: avatar});
    } catch (err) {
      dispatch({type: "user/error", payload: err})
    }
  }
}

export function sendMessage(channelId, messageData) {
  return async function() {
    try {
      console.log("sending message...", channelId, messageData);
      await fetchSendMessage(channelId, messageData);
      console.log("message sent successfully");
    }
    catch (err) {
      console.log(err)
    }
    
  }
}

export function removeUser(userId, channelId) {
  return async function(dispatch) {
    try {
      await fetchRemoveUser(userId, channelId);
      // Dispatch any necessary actions after the user is removed
    } catch (err) {
      dispatch({ type: "user/error", payload: err });
    }
  };
}


  

