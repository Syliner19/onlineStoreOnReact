import { request, response } from "express";
import { brands, devices, types } from "../bd.js";
import { getUserFromSession } from "./helpers.js";
const BACKEND_URL = process.env.VITE_APP_API_URL || "http://localhost:3000/";
export const getDevices = (request, response) => {
  try {
    return response
      .status(200)
      .json({
        success: true,
        count: devices.length,
        devices: getFilteredDevices(request),
      });
  } catch (e) {
    return (
      response.status(500),
      json({ success: false, message: "Ошибка при получении устройств" })
    );
  }
};

export const getFilteredDevices = (request) => {
  const { type, brand } = request.query;

  return devices.filter((device) => {
    return (
      (!type || device.type === type) && (!brand || device.brand === brand)
    );
  });
};

export const getDevicesById = (request, response) => {
  const { id } = request.params;
  const device = devices.find((d) => d.id === id);
  if (!device) {
    return response
      .status(404)
      .json({ success: false, message: "Товар не найден" });
  }
  return response.status(200).json({ success: true, device });
};

export const addType = (request, response) => {
  const user = getUserFromSession(request);
  if (!user || user.role !== "ADMIN") {
    return response.status(403).json({ message: "Доступ запрещен" });
  }
  if (types.some((t) => t.name === request.body.name)) {
    return response.status(401).json({ message: "Тип уже существует" });
  }
  const type = { id: Date.now().toString(), name: request.body.name };
  types.push(type);
  return response
    .status(200)
    .json({ message: `Добавлен новый тип ${type.name}`, type, types });
};
export const getTypes = (request, response) => {
  try {
    return response
      .status(200)
      .json({ success: true, count: types.length, types });
  } catch (e) {
    return (
      response.status(500),
      json({ success: false, message: "Ошибка при получении типов" })
    );
  }
};
export const deleteType = (request, response) => {
  try {
    const user = getUserFromSession(request);
    const { id } = request.params;
    if (!user || user.role !== "ADMIN") {
      return response.status(403).json({ message: "Доступ запрещен" });
    }
    const typeIndex = types.findIndex((type) => type.id === id);
    if (typeIndex === -1) {
      return response.status(404).json({
        success: false,
        message: `Тип не найден!`,
      });
    }
    const deletedType = types[typeIndex];
    types.splice(typeIndex, 1);
    return response.status(200).json({
      success: true,
      message: `Тип ${deletedType.name} удален`,
      deletedType,
      types,
    });
  } catch (e) {
    return response
      .status(500)
      .json({ success: false, message: "Ошибка при удалении типа" });
  }
};

export const addBrand = (request, response) => {
  const user = getUserFromSession(request);
  if (!user || user.role !== "ADMIN") {
    return response.status(403).json({ message: "Доступ запрещен" });
  }
  if (brands.some((brand) => brand.name === request.body.name)) {
    return response.status(401).json({ message: "Бренд уже существует" });
  }
  const brand = { id: Date.now().toString(), name: request.body.name };
  brands.push(brand);
  return response
    .status(200)
    .json({ message: `Добавлен новый бренд ${brand.name}`, brand });
};

export const deleteBrand = (request, response) => {
  try {
    const user = getUserFromSession(request);
    if (!user || user.role !== "ADMIN") {
      return response.status(403).json({ message: "Доступ запрещен" });
    }
    const deletedBrand = brands.find(
      (brand) => brand.name.toLowerCase() == request.body.name.toLowerCase(),
    );
    if (!deletedBrand) {
      return response.status(404).json({ message: "Бренд не найден!" });
    }
    const brandIndex = brands.findIndex(
      (brand) => brand.id === deletedBrand.id,
    );
    if (brandIndex !== -1) {
      brands.splice(brandIndex, 1);
    }
    return response.status(200).json({
      success: true,
      message: `Бренд ${deletedBrand.name} удален`,
      deletedBrand,
    });
  } catch (e) {
    return response
      .status(500)
      .json({ success: false, message: "Ошибка при удалении бренда" });
  }
};

export const getBrands = (request, response) => {
  try {
    return response
      .status(200)
      .json({ success: true, count: brands.length, brands });
  } catch (e) {
    return (
      response.status(500),
      json({ success: false, message: "Ошибка при получении брендов" })
    );
  }
};

export const addDevice = (request, response) => {
  const user = getUserFromSession(request);
  if (!user || user.role !== "ADMIN") {
    return response.status(403).json({ message: "Доступ запрещен" });
  }
  const { name, price, rating, type, brand, description } = request.body;
  let imgURL = "";
  if (request.file) {
    imgURL = `${BACKEND_URL}uploads/devices/${request.file.filename}`;
  } else {
    imgURL = null;
  }
  let parsedDescription = [];
  if (description) {
    parsedDescription = JSON.parse(description);
  }
  const newDevice = {
    id: Date.now().toString(),
    name: name,
    price: Number(price),
    rating: rating ? Number(rating) : 0,
    img: imgURL,
    type: type,
    brand: brand,
    description: parsedDescription,
  };
  devices.push(newDevice);
  return response.status(201).json({
    success: true,
    message: "Устройство добавлено успешно",
    device: newDevice,
  });
};
