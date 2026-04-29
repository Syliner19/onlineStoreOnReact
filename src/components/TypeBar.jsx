import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDevices,
  selectSelectedType,
  selectTypes,
} from "../store/selectors";
import { ListGroup } from "react-bootstrap";
import { setSelectType } from "../store/actions";

const TypeBar = () => {
  const dispatch = useDispatch();
  const types = useSelector(selectTypes);
  const selectedType = useSelector(selectSelectedType);
  console.log(selectedType);
  return (
    <ListGroup>
      {types.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === selectedType.id}
          key={type.id}
          onClick={() => {
            dispatch(setSelectType(type));
          }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default TypeBar;
