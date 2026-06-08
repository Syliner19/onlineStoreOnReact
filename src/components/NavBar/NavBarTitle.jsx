import React from "react";
import { SHOP_ROUTE } from "../../utils/const";
import { NavLink } from "react-router-dom";

const NavBarTitle = ({ title }) => {
  return (
    <NavLink style={{ color: "white" }} to={SHOP_ROUTE}>
      {title}
    </NavLink>
  );
};

export default NavBarTitle;
