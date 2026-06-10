import { roles, users } from "../bd.js";
import { getUserFromSession } from "./helpers.js";
import { MAIN_URL } from "../../utils/const.js";

export const getUser = (request, response) => {
  const user = getUserFromSession(request);
  if (!user) {
    return response.status(200).json({
      message: "Пользователь не авторизован",
      success: false,
      user: { id: "", email: "", role: "" },
    });
  }
  return response.status(200).json({
    success: true,
    user: { id: user.id, email: user.email, role: user.role },
  });
};
export const getRoles = (request, response) => {
  const user = getUserFromSession(request);
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
  const user = getUserFromSession(request);
  if (!user) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  const { email, password, role } = request.body;
  if (!roles.some((r) => r.name === role)) {
    return response
      .status(401)
      .json({ success: false, message: "Выберите роль!" });
  }
  if (users.some((user) => user.email === email)) {
    return response
      .status(401)
      .json({ message: "Пользователь уже существует" });
  }
  const newUser = {
    email,
    password,
    role,
    id: Date.now().toString(),
    description: {
      firsName: "",
      secondName: "",
      age: null,
      adress: "",
      img: null,
    },
  };
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
export const searchUsers = (request, response) => {
  const { name } = request.query;
  if (!name) {
    return response.status(200).json({
      success: true,
      message: "Введите имя для поиска",
      users: [],
    });
  }
  const isAuth = getUserFromSession(request);
  if (!isAuth) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  const searchingUsers = users.filter((u) => u.email.includes(name));
  if (searchingUsers.length === 0) {
    return response.status(200).json({
      success: true,
      message: "Пользователи не найдены",
      users: [],
    });
  }
  return response.status(200).json({
    success: true,
    message: "Пользователи найдены",
    users: searchingUsers,
  });
};
export const deleteUser = (request, response) => {
  const isAuth = getUserFromSession(request);
  if (!isAuth) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  const { id } = request.body;
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex === -1) {
    return response
      .status(401)
      .json({ success: false, message: "Пользователь не найден" });
  }
  const deletedUser = users[userIndex];
  users.splice(userIndex, 1);
  const { password, ...userWithoutPassword } = deletedUser;
  return response.status(200).json({
    success: true,
    message: `Пользователь ${deletedUser.email} успешно удален`,
    user: userWithoutPassword,
  });
};
export const changeRole = (request, response) => {
  const user = getUserFromSession(request);
  if (!user) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  const { id, role } = request.body;
  const findedUser = users.find((user) => user.id === id);
  if (findedUser) {
    findedUser.role = role;
  }
  return response.status(200).json({
    success: true,
    message: `У пользователя ${user.name} изменена роль на ${findedUser.role}`,
  });
};
