import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDevices } from "../store/selectors";
import DeviceItem from "./DeviceItem";
import { Col, Row } from "react-bootstrap";

const DeviceList = () => {
  const devices = useSelector(selectDevices);
  const dispatch = useDispatch();
  console.log(devices);
  return (
    <Row>
      {devices.map((device) => (
        <Col key={device.id} className="mt-3">
          <DeviceItem device={device} />
        </Col>
      ))}
    </Row>
  );
};

export default DeviceList;
