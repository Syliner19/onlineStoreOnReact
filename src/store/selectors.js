export const selectAuth = (state) => {
  return state.auth;
};
export const selectIsAuth = (state) => {
  return selectAuth(state).isAuth;
};
export const selectUser = (state) => {
  return selectAuth(state).user;
};
export const selectUserId = (state) => {
  return selectUser(state).id;
};
export const selectRole = (state) => {
  return selectUser(state).role;
};
export const selectIsAdmin = (state) => {
  return selectRole(state) === "ADMIN";
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
export const selectDeviceById = (state, id) => (state) => {
  const devices = selectDevices(state);
  return devices.find((d) => d.id === id);
};
export const selectSelectedType = (state) => {
  return state.selectedType;
};
export const selectSelectedBrand = (state) => {
  return state.selectedBrand;
};
export const selectCart = (state) => {
  return state.cart;
};
export const selectCartCount = (state) => {
  return selectCart(state).count;
};
export const selectCartIsCheked = (state, id) => {
  const item = selectCart(state)[id];
  if (!item) {
    return null;
  }
  return item.checked;
};
