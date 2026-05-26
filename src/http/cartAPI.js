import axios from "axios";
import {
  CART_ROUTE,
  CART_ROUTE_ADD,
  CART_ROUTE_TOGGLE_CHECKBOX_OF_DEVICE,
} from "../utils/const.js";

export const fetchCartItemsAPI = async (user, items) => {
  return axios.post(`/api${CART_ROUTE_ADD}`, { user, items });
};
export const fetchCartById = async (id) => {
  const response = await axios.get(`/api${CART_ROUTE}/${id}`);
  return response.data;
};
