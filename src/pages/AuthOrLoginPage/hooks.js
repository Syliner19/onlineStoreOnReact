import { useNavigate } from "react-router-dom";
import { useFetch } from "../../api/hooks/useFetch";
import { login, logout, registration } from "../../http/userAPI";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../../utils/const";
import { useCallback } from "react";

export const useLogin = () => {
  const { response = {}, error, isLoading, trigger } = useFetch(login);
  return {
    response,
    error,
    isLoading,
    login: trigger,
  };
};
export const useRegistration = () => {
  const { response = {}, error, isLoading, trigger } = useFetch(registration);
  return {
    response,
    error,
    isLoading,
    registration: trigger,
  };
};

export const useLogout = () => {
  const { response = {}, error, isLoading, trigger } = useFetch(logout);
  return {
    response,
    error,
    isLoading,
    logout: trigger,
  };
};

export const useNavigateShop = () => {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(SHOP_ROUTE);
  }, [navigate]);
};

export const useNavigateLogin = () => {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(LOGIN_ROUTE);
  }, [navigate]);
};

export const useNavigateAdmin = () => {
  const navigate = useNavigate();

  return useCallback(() => {
    navigate(ADMIN_ROUTE);
  }, [navigate]);
};
