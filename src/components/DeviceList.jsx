import React from "react";
import { useSelector } from "react-redux";
import { selectDevices } from "../store/selectors";
import DeviceItem from "./DeviceItem";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/const";

const DeviceList = () => {
  const devices = useSelector(selectDevices);
  const navigate = useNavigate();
  return (
    <Row>
      {devices.map((device) => (
        <Col
          key={device.id}
          className="mt-3"
          onClick={() => {
            navigate(DEVICE_ROUTE + "/" + device.id);
          }}
        >
          <DeviceItem device={device} />
        </Col>
      ))}
    </Row>
  );
};

export default DeviceList;
