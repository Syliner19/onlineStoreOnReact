import React, { memo, useContext } from "react";
import { ListGroup } from "react-bootstrap";
import TypeItem from "./TypeItem";
import { CreateTypeContext } from "./CreateTypeContext";

const TypesList = memo(({ onClick }) => {
  const { types } = useContext(CreateTypeContext);

  return (
    <ListGroup>
      {types.map((type) => (
        <TypeItem onClick={onClick} type={type} key={type.id} />
      ))}
    </ListGroup>
  );
});

export default TypesList;
