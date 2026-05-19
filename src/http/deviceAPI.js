import axios from "axios";
import {
  BRANDS_ROUTE,
  DEVICE_ROUTE,
  DEVICES_ROUTE,
  TYPES_ROUTE,
} from "../utils/const.js";

export const fetchDevicesApi = async () => {
  const response = await axios.get(`/api${DEVICES_ROUTE}`);
  return response.data.devices;
};
export const fetchDeviceByIdApi = async (id) => {
  const response = await axios.get(`/api${DEVICE_ROUTE}/${id}`);
  return response.data.device;
};

export const addTypeApi = async (type) => {
  const response = await axios.post(`/api${TYPES_ROUTE}`, { name: type });
  return response.data;
};

export const addBrandApi = async (brand) => {
  const response = await axios.post(`/api${BRANDS_ROUTE}`, { name: brand });
  return response.data;
};

export const fetchBrandApi = async () => {
  const response = await axios.get(`/api${BRANDS_ROUTE}`);
  return response.data.brands;
};
export const addDeviceApi = async (formData) => {
  const response = await axios.post(`/api${DEVICES_ROUTE}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.devices;
};
