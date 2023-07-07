
const initialStateUser = {
    errors: []
};

export default function errorsReducer(state = initialStateUser, action) {
    switch (action.type) {
        case "errors/set": 
            return {...state, errors: action.payload};
        case "errors/clear":
            return {state, errors: action.payload};
        default:
            return state;
      }
}
