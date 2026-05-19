import { sessions, users } from "../bd.js";

export const getUser = (request, response) => {
  const [, sessionId] = request.headers.cookie.split("=");
  const userId = sessions[sessionId];
  const user = users.find((u) => u.id === userId);
  if (!user) {
    return response
      .status(401)
      .json({ message: "Пользователь не авторизован" });
  }
  return response.status(200).json({
    user: { id: user.id, email: user.email, role: user.role },
  });
};
