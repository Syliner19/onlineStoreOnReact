import { useFetchById } from "../../../api/hooks/useFetchById.js";
import { useFetchByUserId } from "../../../api/hooks/useFetchByUserId.js";
import {
  changeCheckboxForDeviceApi,
  deleteDeviceFromCartApi,
  fetchCartByUserId,
} from "../../../http/cartAPI";

export const useCartByUserId = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
  } = useFetchByUserId(fetchCartByUserId);
  return { initialCart: response.cart, error, isLoading };
};

export const useDeleteDeviceFromCartById = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetchById(deleteDeviceFromCartApi);
  return {
    cart: response.cart,
    error,
    isLoading,
    deleteDevice: trigger,
  };
};

export const useChekedDeviceFromCartById = () => {
  const {
    response = { cart: { devices: [], totalPrice: 0 } },
    error,
    isLoading,
    trigger,
  } = useFetchById(changeCheckboxForDeviceApi);
  return {
    cart: response.cart,
    error,
    isLoading,
    checkDevice: trigger,
  };
};
