import axios from "axios";
import {
  CART_ROUTE_ADD,
  CART_ROUTE_TOGGLE_CHECKBOX_OF_DEVICE,
} from "../utils/const";

export const fetchCartItemsAPI = async (user, items) => {
  return axios.post(`/api${CART_ROUTE_ADD}`, { user, items });
};
