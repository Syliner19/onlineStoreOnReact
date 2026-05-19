export const check = (request, response) => {
  console.log(request.headers);
  try {
    const token = request.headers.cookie.split("-");
    const userRole = token[3];
    if (!token || token.length < 4) {
      return response
        .status(401)
        .json({ success: false, message: "Аутентификация не пройдена" });
    }
    return response
      .status(200)
      .json({ success: true, role: userRole, isAdmin: userRole === "ADMIN" });
  } catch (e) {
    return (
      response.status(500),
      json({ success: false, message: "Ошибка проверки прав" })
    );
  }
};
