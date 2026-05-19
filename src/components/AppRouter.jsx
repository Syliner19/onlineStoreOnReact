import React from "react";
import { Navigate, replace, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import { useSelector } from "react-redux";
import { selectIsAdmin, selectIsAuth, selectRole } from "../store/selectors";

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  const isAdmin = useSelector(selectIsAdmin);
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
