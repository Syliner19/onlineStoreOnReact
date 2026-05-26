import { sessions, users } from "../bd.js";

export const isUserAuth = (request) => {
  const [, sessionId] = request.headers.cookie.split("=");
  const userId = sessions[sessionId];
  const user = users.find((u) => u.id === userId);
  return user;
};
