
const initialStateUser = {
    errors: []
};

export const setErrors = (error) => {
    return {
      type: "errors/set",
      payload: error
    }
}

export const clearErrors = () => {
    return {
      type: "errors/clear",
    }
}

export default function errorsReducer(state = initialStateUser, action) {
    switch (action.type) {
        case "errors/set":
            if (Array.isArray(action.payload)) {
                let addedUserChannels = new Array;
                for (let i = 0; i < action.payload.length; i++) {
                    addedUserChannels.push(action.payload[i])
                }
                return {...state, errors: addedUserChannels};
            }
            else { 
                return {...state, errors: [action.payload]} 
            }
        case "errors/clear":
            return {state, errors: []};
        default:
            return state;
      }
}
