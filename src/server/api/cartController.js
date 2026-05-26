import { cart, devices } from "../bd.js";

export const addCart = (request, response) => {
  let { user, items } = request.body;
  const userId = user && user !== "0" ? String(user) : "guest";
  const arrayFromCart = Object.entries(items);
  const devicesFromCart = arrayFromCart
    .map(([id, count]) => {
      const device = devices.find((d) => d.id === id);
      return device
        ? { ...device, count: count.count, checked: count.checked }
        : null;
    })
    .filter(Boolean);
  const totalPrice = devicesFromCart.reduce((acc, device) => {
    acc += device.price * device.count;
    return acc;
  }, 0);
  cart[userId] = {
    devices: devicesFromCart,
    totalPrice,
    date: Date.now().toString(),
  };
  return response
    .status(200)
    .json({ user: userId, success: true, cart: cart[userId] });
};

export const getCartById = (request, response) => {
  const { id } = request.params;
  if (!cart[id]) {
    return response.status(404).json({
      success: false,
      message: `Корзина пользователя ${id} не найдена`,
    });
  }
  return response
    .status(200)
    .json({ user: userId, success: true, cart: cart[id] });
};
