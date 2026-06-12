import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { registration } from "./api/registration.js";
import {
  ADMIN_ROUTE,
  BRANDS_ROUTE,
  CART_CHECKBOX_CONTROL,
  CART_ROUTE,
  CART_ROUTE_ADD,
  CART_ROUTE_DELETE,
  COMPLETE_REGISTRATION_ROUTE,
  DEVICE_ROUTE,
  DEVICES_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTRATION_ROUTE,
  ROLE_ROUTE,
  ROLES_ROUTE,
  TYPES_ROUTE,
  USER_ROUTE,
  USERS_ROUTE,
} from "../utils/const.js";
import { login } from "./api/login.js";
import { logout } from "./api/logout.js";
import { check } from "./api/check.js";
import {
  addBrand,
  addDevice,
  addType,
  deleteBrand,
  deleteType,
  getBrands,
  getDevices,
  getDevicesById,
  getTypes,
} from "./api/deviceController.js";
import {
  addUser,
  changeRole,
  changeUsersInformation,
  completeRegistration,
  deleteUser,
  getRoles,
  getUser,
  searchUsers,
} from "./api/user.js";
import { uploadDevice, uploadUsersAvatar } from "./uploads/multerConfig.js";
import {
  addDeviceToCart,
  changeCheckboxForDevice,
  deleteDeviceFromCart,
  getCartByUserId,
  getChekedDevices,
} from "./api/cartController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(`📝 ${req.method} ${req.url}`);
  next();
});

app.post(`/api${REGISTRATION_ROUTE}`, registration);
app.post(`/api${LOGIN_ROUTE}`, login);
app.post(`/api${LOGOUT_ROUTE}`, logout);
app.post(`/api${ADMIN_ROUTE}`, check);
app.get(`/api${DEVICES_ROUTE}`, getDevices);
app.get(`/api${DEVICE_ROUTE}/:id`, getDevicesById);
app.get(`/api${USER_ROUTE}`, getUser);
app.post(`/api${TYPES_ROUTE}`, addType);
app.get(`/api${TYPES_ROUTE}`, getTypes);
app.delete(`/api${TYPES_ROUTE}/:id`, deleteType);
app.post(`/api${BRANDS_ROUTE}`, addBrand);
app.get(`/api${BRANDS_ROUTE}`, getBrands);
app.delete(`/api${BRANDS_ROUTE}`, deleteBrand);
app.post(`/api${DEVICES_ROUTE}`, uploadDevice.single("img"), addDevice);
app.patch(
  `/api${USERS_ROUTE}`,
  uploadUsersAvatar.single("img"),
  changeUsersInformation,
);
app.get(`/api${ROLES_ROUTE}`, getRoles);
app.post(`/api${USER_ROUTE}`, addUser);
app.post(`/api${COMPLETE_REGISTRATION_ROUTE}`, completeRegistration);
app.get(`/api${USERS_ROUTE}`, searchUsers);
app.delete(`/api${USER_ROUTE}`, deleteUser);
app.post(`/api${ROLE_ROUTE}`, changeRole);
app.post(`/api${CART_ROUTE_ADD}`, addDeviceToCart);
app.get(`/api${CART_ROUTE}`, getCartByUserId);
app.delete(`/api${CART_ROUTE_DELETE}`, deleteDeviceFromCart);
app.post(`/api${CART_CHECKBOX_CONTROL}`, changeCheckboxForDevice);
app.get(`/api${CART_CHECKBOX_CONTROL}/:userId`, getChekedDevices);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Запуск сервера
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`✅ Server started successfully!`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log(`=================================\n`);
});
