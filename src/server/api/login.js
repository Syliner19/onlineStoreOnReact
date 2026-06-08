import { users, sessions } from "../bd.js";

export const login = (request, response) => {
  const { email, password } = request.body;
  if (!email || !password) {
    return response.status(400).json({ message: "Не заполнены все поля!" });
  }
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return response.status(401).json({ message: "Неверный email или пароль" });
  }
  const sessionId = `token-${Date.now()}-${user.role}`;
  sessions[sessionId] = user.id;
  console.log("✅ Сессия сохранена:", sessionId, "→", user.id);
  console.log("📦 Текущие сессии:", sessions);
  return response
    .status(200)
    .cookie("session", sessionId, { httpOnly: true, secure: true })
    .json({
      message: "Успешная авторизация",
      user: { id: user.id, email: user.email, role: user.role },
    });
};
