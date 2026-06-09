import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import {
  useChekedDeviceFromCart,
  useDeleteDeviceFromCart,
  useGetCart,
} from "./hooks";
import { getCheckedDevicesFromCart } from "./helpers";
import CartList from "./CartList";
import CartFooter from "./CartFooter";
import CartEmpty from "./CartEmpty";

const Cart = ({ onHide }) => {
  const { deleteDevice } = useDeleteDeviceFromCart();
  const { checkDevice } = useChekedDeviceFromCart();
  const { cart, error, isLoading, trigger, isEmpty } = useGetCart();

  const handleCheckboxChange = async (id) => {
    const resp = await checkDevice(id);
    trigger();
  };

  const handleDeleteDevice = async (id) => {
    const resp = await deleteDevice(id);
    trigger();
  };

  return (
    <Modal size="lg" centered show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Корзина</Modal.Title>
      </Modal.Header>
      {isEmpty ? (
        <CartEmpty />
      ) : (
        <CartList
          cart={cart}
          handleCheckboxChange={handleCheckboxChange}
          handleDeleteDevice={handleDeleteDevice}
        />
      )}

      <CartFooter
        onHide={onHide}
        cart={cart}
        getCheckedDevicesFromCart={getCheckedDevicesFromCart}
      />
    </Modal>
  );
};

export default Cart;
