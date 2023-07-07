
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
            return {...state, errors: [...state.errors, action.payload]};
        case "errors/clear":
            return {state, errors: []};
        default:
            return state;
      }
}
