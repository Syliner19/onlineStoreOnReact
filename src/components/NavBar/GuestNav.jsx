import React from "react";
import { Nav } from "react-bootstrap";
import NavBarButton from "./NavBarButton";

const GuestNav = ({ onCartClick, onLoginClick }) => {
  return (
    <Nav className="ms-auto" style={{ color: "white" }}>
      <NavBarButton onClick={onCartClick} title="Корзина" />
      <NavBarButton onClick={onLoginClick} title="Авторизация" />
    </Nav>
  );
};

export default GuestNav;
