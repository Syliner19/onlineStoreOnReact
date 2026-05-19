import { users, sessions } from "../bd.js";

export const logout = (request, response) => {
  console.log(request.headers);
  const [, sessionId] = request.headers.cookie.split("=");
  delete sessions[sessionId];
  return response
    .status(204)
    .clearCookie("session", { httpOnly: true, secure: true })
    .json({});
};
