import { request, response } from "express";
import { cart, devices } from "../bd.js";
import { isUserAuth } from "./helpers.js";

export const addDeviceToCart = (request, response) => {
  const isAuth = isUserAuth(request);
  if (isAuth) {
    const { userId, deviceId, count } = request.body;
    const device = devices.find((device) => device.id === deviceId);
    const cartDevice = { ...device, count: count, checked: false };
    if (!device) {
      return response.status(404).json({
        success: false,
        message: "Device not found",
      });
    }
    if (!cart[userId]) {
      cart[userId] = {
        devices: [cartDevice],
        totalPrice: cartDevice.price * cartDevice.count,
        date: Date.now().toString(),
      };
    } else {
      const existingDeviceInUserCart = cart[userId].devices.findIndex(
        (device) => device.id === deviceId,
      );
      if (existingDeviceInUserCart !== -1) {
        cart[userId].devices[existingDeviceInUserCart].count += count;
      } else {
        cart[userId].devices.push(cartDevice);
      }
      cart[userId].totalPrice = cart[userId].devices.reduce((acc, device) => {
        acc += device.price * device.count;
        return acc;
      }, 0);
      cart[userId].date = Date.now().toString();
    }
    return response.status(200).json({ success: true, cart: cart[userId] });
  } else {
    return response.status(403).json({ message: "Вы не авторизованы" });
  }
};

export const getCartByUserId = (request, response) => {
  const user = isUserAuth(request);
  if (user) {
    const userId = user.id;
    if (!cart[userId]) {
      return response.status(200).json({
        success: false,
        cart: { devices: [], totalPrice: 0 },
        message: `Корзина пользователя ${userId} пуста`,
      });
    }
    return response.status(200).json({ success: true, cart: cart[userId] });
  } else {
    return response.status(403).json({ message: "Вы не авторизованы" });
  }
};
export const deleteDeviceFromCart = (request, response) => {
  const user = isUserAuth(request);
  if (user) {
    const userId = user.id;
    const { id } = request.body;
    if (!cart[userId]) {
      return response
        .status(403)
        .json({ success: false, message: "Пользователь не найден" });
    }
    const filteredDevices = cart[userId].devices.filter(
      (device) => device.id !== id,
    );
    const totalPrice = filteredDevices.reduce((acc, device) => {
      acc += device.price * device.count;
      return acc;
    }, 0);
    cart[userId] = {
      devices: filteredDevices,
      totalPrice: totalPrice,
      date: Date.now().toString(),
    };
    return response.status(200).json({ success: true, cart: cart[userId] });
  } else {
    return response.status(403).json({ message: "Вы не авторизованы" });
  }
};
export const changeCheckboxForDevice = (request, response) => {
  const user = isUserAuth(request);
  if (user) {
    const userId = user.id;
    const { id } = request.body;
    if (!cart[userId]) {
      return response
        .status(403)
        .json({ success: false, message: "Пользователь не найден" });
    }
    const findedDeviceIndex = cart[userId].devices.findIndex(
      (device) => device.id === id,
    );
    if (findedDeviceIndex === -1) {
      return response.status(404).json({
        success: false,
        message: `Товар с id ${id} не найден в корзине`,
      });
    }
    cart[userId].devices[findedDeviceIndex].checked =
      !cart[userId].devices[findedDeviceIndex].checked;
    cart[userId].date = Date.now().toString();
    return response.status(200).json({
      success: true,
      cart: cart[userId],
      message: `Чекбокс товара ${id} пользователя ${userId} успешно изменен`,
    });
  }
};

export const getChekedDevices = (request, response) => {
  const isAuth = isUserAuth(request);
  if (isAuth) {
    const { userId } = request.params;
    const filteredDevices = cart[userId].devices.filter(
      (device) => device.checked,
    );
    const totalPrice = filteredDevices.reduce((acc, device) => {
      acc += device.price * device.count;
      return acc;
    }, 0);
    const filteredCart = {
      devices: filteredDevices,
      totalPrice: totalPrice,
      date: Date.now().toString(),
    };
    return response.status(200).json({ success: true, cart: filteredCart });
  }
};
