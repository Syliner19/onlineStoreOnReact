import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../routes";
import { UserContext } from "../context/userContext";

const AppRouter = () => {
  const { isAuth, isAdmin } = useContext(UserContext);
  console.log(isAuth);
  console.log("authRoutes:", authRoutes);
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
