const initialState = {
    channelName: "default",
    messages: []
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
          return { ...state, messages: action.payload };
        case "/messages/send":
          const addChannelArray = state.channels.push(action.payload)
          return {...state, channels: addChannelArray}
        default:
          return state;
      }   
}