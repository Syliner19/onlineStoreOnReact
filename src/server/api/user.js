import { request, response } from "express";
import { roles, sessions, users } from "../bd.js";
import { isUserAdmin } from "./helpers.js";
import { MAIN_URL } from "../../utils/const.js";

export const getUser = (request, response) => {
  const user = isUserAdmin(request);
  if (!user) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  return response.status(200).json({
    user: { id: user.id, email: user.email, role: user.role },
  });
};
export const getRoles = (request, response) => {
  const user = isUserAdmin(request);
  if (!user) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  return response
    .status(200)
    .json({ success: true, count: roles.length, roles });
};
export const addUser = (request, response) => {
  const user = isUserAdmin(request);
  if (!user) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  const { email, password, role } = request.body;
  if (users.some((user) => user.email === email)) {
    return response
      .status(401)
      .json({ message: "Пользователь уже существует" });
  }
  const newUser = { email, password, role, id: Date.now().toString() };
  users.push(newUser);
  const { password: _, ...userWithoutPassword } = newUser;
  const registrationLink = `${MAIN_URL}/complete-registration?email=${encodeURIComponent(email)}`;
  return response.status(200).json({
    success: true,
    message: `Пользователь ${newUser.email} успешно добавлен`,
    user: userWithoutPassword,
    registrationLink,
  });
};
export const completeRegistration = (request, response) => {
  const { email } = request.query;
  const { password } = request.body;
  if (!email || !password) {
    return response
      .status(400)
      .json({ success: false, message: "Email и пароль обязательны" });
  }
  const user = users.find((u) => u.email === email && u.password === null);
  if (!user) {
    return response.status(404).json({
      success: false,
      message: "Пользователь не найден или уже активирован",
    });
  }
  user.password = password;
  return response.status(200).json({
    success: true,
    message: "Пароль успешно установлен. Теперь вы можете войти в систему",
  });
};
