import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { useGetTypes } from "./modals/CreateType/hooks";

const TypeBar = () => {
  const { types, getTypes } = useGetTypes();
  const [selectedType, setSelectedType] = useState("");

  return (
    <ListGroup>
      {types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === selectedType}
          key={type.id}
          onClick={() => {
            setSelectedType(type.id);
          }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
