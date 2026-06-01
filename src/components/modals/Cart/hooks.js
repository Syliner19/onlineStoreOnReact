import { useFetch } from "../../../api/hooks/useFetch.js";
import {
  toggleDeviceCheckbox,
  deleteDeviceFromCart,
  getCart,
} from "../../../http/cartAPI.js";

export const useGetCart = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetch(getCart, { autoTrigger: true });
  console.log(response);
  return { cart: response.cart, error, isLoading, trigger };
};

export const useDeleteDeviceFromCart = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetch(deleteDeviceFromCart);
  return {
    cart: response?.cart || { devices: [], totalPrice: 0 },
    error,
    isLoading,
    deleteDevice: trigger,
  };
};

export const useChekedDeviceFromCart = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetch(toggleDeviceCheckbox);
  return {
    cart: response.cart,
    error,
    isLoading,
    checkDevice: trigger,
  };
};
