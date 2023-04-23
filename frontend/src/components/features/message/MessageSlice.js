
const initialState = {
    channelName: "default",
    messages: [
      {name: "Group 1", message: "Hello Group 1"},
      {name: "Group 2", message: "Hello Group 2"},
      {name: "Group 3", message: "Hello Group 3"}]
  };

export const loadMessages = (source) => {
    return {
      type: "/messages/load",
      payload: source
    }
  }
  export const sendMessages = (message) => {
    return {
      type: "/messages/send",
      payload: message
    }
  }

export default function messageReducer(state = initialState, action) {
    switch (action.type) {
        case "/messages/load":
          return { ...state, channelName: action.payload };
        case "/messages/send":
          const addChannelArray = state.channels.push(action.payload)
          return {...state, channels: addChannelArray}
        default:
          return state;
      }   
}