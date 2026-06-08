import React, { useContext } from "react";
import { Navigate, replace, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import { useUserRole } from "../hooks/useUserRole";
import { UserContext } from "../context/userContext";

const AppRouter = () => {
  const { isAuth, isAdmin } = useContext(UserContext);

  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      {isAdmin &&
        adminRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
