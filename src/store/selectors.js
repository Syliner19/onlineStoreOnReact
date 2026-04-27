export const selectAuth = (state) => {
  return state.auth;
};
export const selectIsAuth = (state) => {
  return selectAuth(state).isAuth;
};
export const selectUser = (state) => {
  return selectAuth(state).user;
};
export const selectTypes = (state) => {
  return state.types;
};
export const selectBrands = (state) => {
  return state.brands;
};
export const selectDevices = (state) => {
  return state.devices;
};
