import React from "react";
import DeviceItem from "../DeviceItem";
import { Col, Row } from "react-bootstrap";
import { useGetDevices, useNavigateDevice } from "./hooks";

const DeviceList = () => {
  const { devices, isLoading, error } = useGetDevices()
  const goToDevice = useNavigateDevice();

  if (isLoading && !error) {
    return <div>Загрузка...</div>
  }

  return (
    <Row>
      {devices.map((device) => (
        <Col key={device.id} className="mt-3">
          <DeviceItem device={device} onClick={goToDevice} />
        </Col>
      ))}
    </Row>
  );
};

export default DeviceList;
