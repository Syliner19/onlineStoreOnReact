import axios from "axios";
import {
  COMPLETE_REGISTRATION_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTRATION_ROUTE,
  ROLE_ROUTE,
  ROLES_ROUTE,
  USER_ROUTE,
  USERS_ROUTE,
} from "../utils/const.js";
export const registration = async (email, password) => {
  try {
    const response = await axios.post(`/api${REGISTRATION_ROUTE}`, {
      email,
      password,
    });
  } catch (e) {
    console.log("Ошибка");
  }
};
export const login = async (email, password) => {
  const response = await axios.post(`/api${LOGIN_ROUTE}`, { email, password });
  return response;
};

export const logout = () => {
  return axios.post(`/api${LOGOUT_ROUTE}`);
};

export const user = async () => {
  return axios.get(`/api${USER_ROUTE}`).then((response) => response.data);
};

export const fetchRoles = async () => {
  return axios
    .get(`/api${ROLES_ROUTE}`)
    .then((response) => response.data.roles);
};
export const addUserApi = async (email, role) => {
  const response = await axios.post(`/api${USER_ROUTE}`, {
    email,
    password: null,
    role,
  });
  console.log(response);
  return response.data;
};
export const confirmPasswordApi = async (email, password) => {
  return axios.post(
    `/api${COMPLETE_REGISTRATION_ROUTE}?email=${encodeURIComponent(email)}`,
    { password },
  );
};
export const fetchSearchingUsers = async (name) => {
  try {
    const response = await axios.get(`/api${USERS_ROUTE}`, {
      params: { name },
    });
    return response.data.users;
  } catch (e) {
    console.log("Ошибка", e);
    throw e;
  }
};
export const fetchDeleteUser = async (id) => {
  const response = await axios.delete(`/api${USER_ROUTE}`, { data: { id } });
  return response.data;
};
export const updateUserRoleApi = async (id, role) => {
  const response = await axios.post(`/api${ROLE_ROUTE}`, { id, role });
  return response.data;
};
