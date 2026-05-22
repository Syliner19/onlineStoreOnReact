export const selectAuth = (state) => {
  return state.auth;
};
export const selectIsAuth = (state) => {
  return selectAuth(state).isAuth;
};
export const selectUser = (state) => {
  console.log(state);
  return selectAuth(state).user;
};
export const selectRole = (state) => {
  return selectUser(state).role;
};
export const selectIsAdmin = (state) => {
  return selectUser(state).role === "ADMIN";
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
export const selectDeviceById = (id) => (state) => {
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
export const selectCartIsCheked = (state) => {
  return selectCart(state).cheked;
};
