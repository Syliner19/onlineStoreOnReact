import axios from "axios";
import { TYPES_ROUTE } from "../utils/const";

export const addTypeApi = async (type) => {
  const response = await axios.post(`/api${TYPES_ROUTE}`, { name: type });
  return response.data;
};
export const deleteTypeApi = async (id) => {
  const response = await axios.delete(`/api${TYPES_ROUTE}/${id}`);
  return response.data;
};
export const fetchTypesApi = async () => {
  const response = await axios.get(`/api${TYPES_ROUTE}`);
  return response.data.types;
};
