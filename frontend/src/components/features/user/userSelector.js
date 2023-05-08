export const userIsLoggedInSelector = (state)=>state.user.isLoggedIn;

export const userErrorSelector = (state)=>state.user.error;

export const userDataSelector = (state)=>state.user.user;

export const userAvatarSelector = (state)=>state.user.user.avatar.url;