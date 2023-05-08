import { fetchLogin, fetchLogout } from '../fetchFunctions';

const initialStateUser = {
    isLoggedIn: false,
    user: null,
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
          return {...state, isLoggedIn: true, user: action.payload, error: action.payload };
        case "user/error":
          return {...state, isLoggedIn: false, user: null, error: action.payload };
        case "user/logout":
          return {...state, isLoggedIn: false, user: null,  error: null };
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
      } catch (err) {
        dispatch({ type: "user/error", payload: err });
      }
    };
  }

