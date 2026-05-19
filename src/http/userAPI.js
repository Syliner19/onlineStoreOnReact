import axios from "axios";
import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTRATION_ROUTE,
  USER_ROUTE,
} from "../utils/const.js";
export const registration = async (email, password) => {
  try {
    const response = await axios.post(`/api${REGISTRATION_ROUTE}`, {
      email,
      password,
    });
    console.log(response);
    console.log(response.data.message);
  } catch (e) {
    console.log("Ошибка");
  }
};
export const login = async (email, password) => {
  const response = await axios.post(`/api${LOGIN_ROUTE}`, { email, password });
  console.log(response.data.message);
  console.log(response.data);
  return response;
};

export const logout = () => {
  return axios.post(`/api${LOGOUT_ROUTE}`);
};

const check = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Пользователь не авторизован");
  }
  const tokenParts = token.split("-");
  const userId = tokenParts[1];
  if (!userId) {
    throw new Error("Невалидный токен");
  }
  const response = await $authHost.get(`users/${userId}`);
  return response.data;
};

export const user = () => {
  return axios.get(`/api${USER_ROUTE}`).then((r) => r.data.user);
};
