import { useFetch } from "../../../api/hooks/useFetch.js";
import * as cartApi from "../../../http/cartAPI";

export const useGetCart = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
  } = useFetch(cartApi.getCart, { autoTrigger: true });
  return { cart: response.cart, error, isLoading };
};

export const useDeleteDeviceFromCart = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetch(cartApi.deleteDeviceFromCart);
  return {
    cart: response.cart,
    error,
    isLoading,
    deleteDevice: trigger,
  };
};

export const useGetCheckedDevicesFromCart = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetch(cartApi.toggleDeviceCheckbox);
  return {
    cart: response.cart,
    error,
    isLoading,
    checkDevice: trigger,
  };
};
