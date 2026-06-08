import { users, sessions } from "../bd.js";

export const logout = (request, response) => {
  if (!request.headers.cookie) {
    return response.status(200).json({ message: "Вы не авторизованы" });
  }
  console.log(request.headers);
  const [, sessionId] = request.headers.cookie.split("=");
  delete sessions[sessionId];
  return response
    .status(204)
    .clearCookie("session", { httpOnly: true, secure: true })
    .json({ message: "Вы успешно вышли из системы" });
};
