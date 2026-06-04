import React, { useContext } from "react";
import { Dropdown } from "react-bootstrap";
import { CreateUsersContext } from "./CreateUsersContext";

const UserRoleDropdown = ({ title, ...rest }) => {
  const { roles } = useContext(CreateUsersContext);
  const { onChange } = rest;
  return (
    <Dropdown className="mt-2 mb-2">
      <Dropdown.Toggle>{title}</Dropdown.Toggle>
      <Dropdown.Menu>
        {roles.map((role) => (
          <Dropdown.Item onClick={() => onChange(role.name)} key={role.id}>
            {role.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserRoleDropdown;
