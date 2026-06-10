import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useGetTypes } from "./modals/CreateType/hooks";

const TypeBar = ({ filter, onClick }) => {
  const { types, getTypes } = useGetTypes();
  return (
    <ListGroup>
      {types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.name === filter.type}
          key={type.id}
          onClick={() => {
            onClick(type.name);
          }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
