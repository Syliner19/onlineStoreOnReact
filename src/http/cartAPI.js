import axios from "axios";
import {
  CART_CHECKBOX_CONTROL,
  CART_ROUTE,
  CART_ROUTE_ADD,
  CART_ROUTE_DELETE,
  CART_ROUTE_TOGGLE_CHECKBOX_OF_DEVICE,
} from "../utils/const.js";

export const addDeviceToCart = async ({ deviceId, count = 1 }) => {
  const response = await axios.post(`/api${CART_ROUTE_ADD}`, {
    deviceId,
    count,
  });
  return response.data;
};
export const getCart = async () => {
  const response = await axios.get(`/api${CART_ROUTE}`);
  return response.data;
};
export const deleteDeviceFromCart = async (id) => {
  const response = await axios.delete(`/api${CART_ROUTE_DELETE}`, {
    data: { id },
  });
  return response.data;
};
export const toggleDeviceCheckbox = async (id) => {
  const response = await axios.post(`/api${CART_CHECKBOX_CONTROL}`, { id });
  return response.data;
};
export const getCheckedDevices = async (userId) => {
  const response = await axios.get(`/api${CART_CHECKBOX_CONTROL}/${userId}`);
  return response.data;
};
