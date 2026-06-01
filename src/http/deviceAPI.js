import axios from "axios";
import {
  BRANDS_ROUTE,
  DEVICE_ROUTE,
  DEVICES_ROUTE,
  TYPES_ROUTE,
} from "../utils/const.js";

export const getDevices = async () => {
  const response = await axios.get(`/api${DEVICES_ROUTE}`);
  return response.data.devices;
};
export const getDeviceById = async (id) => {
  const response = await axios.get(`/api${DEVICE_ROUTE}/${id}`);
  return response.data.device;
};

export const createNewDevice = async (formData) => {
  const response = await axios.post(`/api${DEVICES_ROUTE}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data.device;
};
