import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectDevices,
  selectSelectedType,
  selectTypes,
} from "../store/selectors";
import { ListGroup } from "react-bootstrap";
import { setSelectType, setTypes } from "../store/actions";
import { fetchTypesApi } from "../http/deviceAPI";

const TypeBar = () => {
  const dispatch = useDispatch();
  const types = useSelector(selectTypes);
  const selectedType = useSelector(selectSelectedType);
  useEffect(() => {
    fetchTypesApi()
      .then((brandsFromApi) => dispatch(setTypes(brandsFromApi)))
      .catch((e) => console.log(e));
  }, [dispatch]);
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
