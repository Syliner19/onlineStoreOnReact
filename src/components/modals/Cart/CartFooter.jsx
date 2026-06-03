import React from "react";
import { Button, Modal } from "react-bootstrap";

const CartFooter = ({ onHide, getCheckedDevicesFromCart, cart }) => {
  return (
    <Modal.Footer>
      <Button variant={"outline-danger"} onClick={onHide}>
        Закрыть
      </Button>
      <Button
        variant={"outline-success"}
        onClick={() => getCheckedDevicesFromCart(cart)}
      >
        Оформить заказ
      </Button>
    </Modal.Footer>
  );
};

export default CartFooter;
