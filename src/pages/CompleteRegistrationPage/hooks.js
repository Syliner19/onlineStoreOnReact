import { useState } from "react";
import { useFetch } from "../../api/hooks/useFetch";
import { confirmPasswordApi } from "../../http/userAPI";

export const useConfirmPassword = () => {
  const {
    response = {},
    error,
    isLoading,
    trigger,
  } = useFetch(confirmPasswordApi);
  return {
    response: response?.data || {},
    success: response?.data?.success || false,
    confirmError: error,
    isLoading,
    confirm: trigger,
  };
};
export const usePasswordValidation = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const validatePassword = () => {
    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return null;
    }
    setError("");
    return { password, confirmPassword };
  };
  return {
    confirmPassword,
    setConfirmPassword,
    password,
    setPassword,
    localError: error,
    validatePassword,
  };
};
