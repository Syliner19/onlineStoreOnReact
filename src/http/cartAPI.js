import axios from "axios";
import {
  CART_CHECKBOX_CONTROL,
  CART_ROUTE,
  CART_ROUTE_ADD,
  CART_ROUTE_DELETE,
  CART_ROUTE_TOGGLE_CHECKBOX_OF_DEVICE,
} from "../utils/const.js";

export const addDeviceToCartApi = async (userId, deviceId, count = 1) => {
  return axios.post(`/api${CART_ROUTE_ADD}`, { userId, deviceId, count });
};
export const fetchCartByUserId = async (id) => {
  const response = await axios.get(`/api${CART_ROUTE}/${id}`);
  return response.data;
};
export const deleteDeviceFromCartApi = async (userId, id) => {
  return axios.delete(`/api${CART_ROUTE_DELETE}`, { data: { userId, id } });
};
export const changeCheckboxForDeviceApi = async (userId, id) => {
  return axios.post(`/api${CART_CHECKBOX_CONTROL}`, { userId, id });
};
export const fetchCheckedDevices = async (userId) => {
  const response = await axios.get(`/api${CART_CHECKBOX_CONTROL}/${userId}`);
  return response.data;
};
