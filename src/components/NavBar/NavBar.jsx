import React, { memo, useContext } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useUserRole } from "../../hooks/useUserRole";
import {
  useLogout,
  useNavigateAdmin,
  useNavigateLogin,
} from "../../pages/AuthOrLoginPage/hooks";
import { UserContext } from "../../context/userContext";
import NavBarButton from "./NavBarButton";
import AuthNav from "./AuthNav";
import GuestNav from "./GuestNav";
import NavBarTitle from "./NavBarTitle";

const NavBar = memo(({ setCartVisible }) => {
  const { isAuth, isAdmin, refresh } = useContext(UserContext);
  const { logout } = useLogout();
  const goToLogin = useNavigateLogin();
  const goToAdmin = useNavigateAdmin();

  const handleLogout = async () => {
    try {
      await logout();
      await refresh();
      goToShop();
    } catch (e) {}
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <NavBarTitle title="Купи Девайс" />
        {isAuth ? (
          <AuthNav
            onAdminClick={goToAdmin}
            onCartClick={() => setCartVisible(true)}
            onLogoutClick={handleLogout}
            isAdmin={isAdmin}
          />
        ) : (
          <GuestNav
            onCartClick={() => setCartVisible(true)}
            onLoginClick={goToLogin}
          />
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
