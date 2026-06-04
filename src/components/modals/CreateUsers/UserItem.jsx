import React, { useContext } from "react";
import { CloseButton, ListGroup } from "react-bootstrap";
import UserRoleDropdown from "./UserRoleDropdown";
import { CreateUsersContext } from "./CreateUsersContext";

const UserItem = ({ user, onChange, onClick }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      <h5 className="d-flex align-items-center justify-content-center">
        {user.email}
      </h5>
      <div className="d-flex align-items-center justify-content-between gap-3">
        <UserRoleDropdown
          onChange={(newRole) => onChange(user.id, newRole)}
          title={user.role}
          user={user}
        />
        <CloseButton onClick={() => onClick(user.id)} />
      </div>
    </ListGroup.Item>
  );
};

export default UserItem;
