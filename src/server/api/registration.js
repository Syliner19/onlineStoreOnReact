import { users } from "../bd.js";
export const registration = (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ message: "Заполните все поля" });
  }
  const userExists = users.find((u) => u.email === email);
  if (userExists) {
    return response
      .status(400)
      .json({ message: "Пользователь с таким email существует" });
  }
  const newUser = {
    id: Date.now().toString(),
    email,
    password,
    role: "USER",
    description: {
      firstName: "",
      secondName: "",
      age: null,
      adress: "",
      img: null,
    },
  };
  users.push(newUser);
  return response
    .status(200)
    .json({ message: "Регистрация прошла успешно!", users });
};
