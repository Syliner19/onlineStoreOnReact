import { Nav } from "react-bootstrap";
import NavBarButton from "./NavBarButton";

const AuthNav = ({
  onAdminClick,
  onCartClick,
  onLogoutClick,
  isAdmin,
  onUserAccountClick,
}) => {
  return (
    <Nav className="ms-auto" style={{ color: "white" }}>
      <NavBarButton onClick={onCartClick} title="Корзина" />
      <NavBarButton onClick={onUserAccountClick} title="Личный кабинет" />
      {isAdmin && <NavBarButton onClick={onAdminClick} title="Админ панель" />}
      <NavBarButton onClick={onLogoutClick} title="Выйти" />
    </Nav>
  );
};

export default AuthNav;
