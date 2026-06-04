import React, { useContext } from "react";
import { ListGroup } from "react-bootstrap";
import UserItem from "./UserItem";
import { CreateUsersContext } from "./CreateUsersContext";

const UsersList = ({ onChange, onClick }) => {
  const { users } = useContext(CreateUsersContext);
  return (
    <ListGroup>
      {users.map((user) => (
        <UserItem
          key={user.id}
          onClick={onClick}
          onChange={onChange}
          user={user}
        />
      ))}
    </ListGroup>
  );
};

export default UsersList;
