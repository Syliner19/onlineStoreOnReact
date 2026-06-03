import React, { memo, useContext } from "react";
import { CloseButton, ListGroup } from "react-bootstrap";
import { CreateTypeContext } from "./CreateTypeContext";

const TypeItem = memo(({ onClick, type }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between">
      {type.name}
      <CloseButton onClick={() => onClick(type.id)} />
    </ListGroup.Item>
  );
});

export default TypeItem;
