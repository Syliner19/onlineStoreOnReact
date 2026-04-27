import {
  SET_AUTH,
  SET_BRANDS,
  SET_DEVICES,
  SET_TYPES,
  SET_USER,
} from "./consts";

export const setAuth = (isAuth) => {
  return { type: SET_AUTH, payload: isAuth };
};

export const setUser = (user) => {
  return { type: SET_USER, payload: user };
};
export const setDevices = (devices) => {
  return { type: SET_DEVICES, payload: devices };
};
export const setTypes = (types) => {
  return { type: SET_TYPES, payload: types };
};
export const setBrands = (brands) => {
  return { type: SET_BRANDS, payload: brands };
};
