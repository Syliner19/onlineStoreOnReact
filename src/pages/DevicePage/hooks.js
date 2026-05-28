import { useFetch } from "../../api/hooks/useFetch";
import * as deviceApi from "../../http/deviceAPI";
import * as cartApi from "../../http/cartAPI";

export const useGetDevice = () => {
  const {
    response = {},
    error,
    isLoading,
    trigger,
  } = useFetch(deviceApi.getDeviceById);
  return {
    cart: response.cart,
    error,
    isLoading,
    getDevice: trigger,
  };
}

export const useAddDevice = () => {
  const {
    response = {cart: {devices: [], totalPrice: 0}},
    error,
    isLoading,
    trigger,
  } = useFetch(cartApi.addDeviceToCart);

  return {
    cart: response.cart,
    error,
    isLoading,
    addDevice: trigger,
  };
}