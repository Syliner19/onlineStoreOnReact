import React from "react";
import { ListGroup } from "react-bootstrap";
import CartItem from "./CartItem";

const CartList = ({ cart, handleCheckboxChange, handleDeleteDevice }) => {
  return (
    <ListGroup className="d-flex">
      {cart.devices.map((device) => (
        <CartItem
          key={device.id}
          device={device}
          handleCheckboxChange={handleCheckboxChange}
          handleDeleteDevice={handleDeleteDevice}
        />
      ))}
      <div className="d-flex justify-content-end">
        <div className="fw-bold pe-3 pt-2 pb-2">Итого: {cart.totalPrice} ₽</div>
      </div>
    </ListGroup>
  );
};

export default CartList;
