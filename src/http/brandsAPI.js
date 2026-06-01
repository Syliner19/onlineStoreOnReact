import axios from "axios";
import { BRANDS_ROUTE } from "../utils/const";

export const addBrandApi = async (brand) => {
  const response = await axios.post(`/api${BRANDS_ROUTE}`, { name: brand });
  return response.data;
};
export const deleteBrandApi = async (brand) => {
  const response = await axios.delete(`/api${BRANDS_ROUTE}`, {
    data: { name: brand },
  });
  return response.data;
};
export const fetchBrandApi = async () => {
  const response = await axios.get(`/api${BRANDS_ROUTE}`);
  return response.data.brands;
};
