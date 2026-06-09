import React from "react";
import { CloseButton, Form, Image, ListGroup } from "react-bootstrap";

const CartItem = ({ device, handleCheckboxChange, handleDeleteDevice }) => {
  return (
    <ListGroup.Item className="d-flex justify-content-between w-100">
      <div className="d-flex align-items-center gap-3 w-100">
        <Form.Check
          type="checkbox"
          label=""
          className="m-0"
          checked={device.checked}
          style={{ boxShadow: "none" }}
          onChange={() => {
            handleCheckboxChange(device.id);
          }}
        />
        <div style={{ width: 50 }}>
          <Image width={50} height={50} rounded src={device.img} />
        </div>
        <div className="flex-grow-1 ">
          <h5 className="mb-0 justify-content-center">{device.name}</h5>
          <small className="text-muted justify-content-center">
            {device.brand}
          </small>
        </div>{" "}
        <div className="text-end">
          <div className="fw-bold">{device.count} шт.</div>
        </div>
        <div className="text-end">
          <div className="fw-bold">{device.price} ₽</div>
          <small className="text-muted">за шт.</small>
        </div>
        <CloseButton
          onClick={() => {
            handleDeleteDevice(device.id);
          }}
        />
      </div>
    </ListGroup.Item>
  );
};
export default CartItem;
