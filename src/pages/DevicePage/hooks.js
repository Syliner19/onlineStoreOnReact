import { useCallback } from "react";
import { useFetch } from "../../api/hooks/useFetch";
import { addDeviceToCart } from "../../http/cartAPI";
import { getDeviceById } from "../../http/deviceAPI";

export const useGetDevice = (id) => {
  const getDevice = useCallback(() => getDeviceById(id), [getDeviceById, id]);
  const {
    response = {},
    error,
    isLoading,
    trigger,
  } = useFetch(getDevice, { autoTrigger: true });
  return { device: response, error, isLoading, getDevice: trigger };
};

export const useAddDevice = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetch(addDeviceToCart);
  return { cart: response.cart, error, isLoading, addDevice: trigger };
};
