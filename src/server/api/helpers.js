import { sessions, users } from "../bd.js";

export const getUserFromSession = (request) => {
  if (!request.headers.cookie) {
    console.log("No cookie header");
    return null;
  }
  const [, sessionId] = request.headers.cookie.split("=");
  const userId = sessions[sessionId];
  const user = users.find((u) => u.id === userId);
  return user;
};
