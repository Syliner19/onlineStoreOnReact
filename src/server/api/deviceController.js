import { request } from "express";
import { brands, devices, types } from "../bd.js";
import { isUserAdmin } from "./helpers.js";

export const getDevices = (request, response) => {
  try {
    return response
      .status(200)
      .json({ success: true, count: devices.length, devices });
  } catch (e) {
    return (
      response.status(500),
      json({ success: false, message: "Ошибка при получении устройств" })
    );
  }
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
  const user = isUserAdmin(request);
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
    .json({ message: `Добавлен новый тип ${type.name}`, type });
};

export const addBrand = (request, response) => {
  const user = isUserAdmin(request);
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
  const user = isUserAdmin(request);
  if (!user || user.role !== "ADMIN") {
    return response.status(403).json({ message: "Доступ запрещен" });
  }
  const { name, price, rating, type, brand, description } = request.body;
  let imgURL = "";
  if (request.file) {
    imgURL - `/uploads/devices/${request.file.filename}`;
  }
  let parsedDescription = [];
  if (description) {
    parsedDescription = JSON.stringify(description);
  }
  const newDevice = {
    id: Date.now().toString(),
    name: name,
    price: Number(price),
    rating: rating ? Number(rating) : 0,
    img: imgURL,
    type: type,
    brand: brand,
    description: description,
  };
  devices.push(newDevice);
  return response
    .status(201)
    .json({ success: true, message: "Устройство добавлено успешно", devices });
};
