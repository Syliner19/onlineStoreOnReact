import React from "react";
import { Navigate, replace, Route, Routes } from "react-router-dom";
import { authRoutes, publicRoutes } from "../routes";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../store/selectors";

const AppRouter = () => {
  const isAuth = useSelector(selectIsAuth);
  return (
    <Routes>
      {isAuth &&
        authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route path="*" element={<Navigate to="/shop" replace />} />
    </Routes>
  );
};

export default AppRouter;
