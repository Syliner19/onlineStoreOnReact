import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectDevices } from "../store/selectors";
import DeviceItem from "./DeviceItem";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/const";
import { fetchDevicesApi } from "../http/deviceAPI";
import { setDevices } from "../store/actions";

const DeviceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const devices = useSelector(selectDevices);

  useEffect(() => {
    fetchDevicesApi()
      .then((devicesFromApi) => {
        dispatch(setDevices(devicesFromApi));
      })
      .catch((e) => console.log(e));
  }, [dispatch]);

  const handleOnClick = useCallback(
    (id) => {
      navigate(DEVICE_ROUTE + "/" + id);
    },
    [navigate],
  );

  return (
    <Row>
      {devices.map((device) => (
        <Col key={device.id} className="mt-3">
          <DeviceItem device={device} onClick={handleOnClick} />
        </Col>
      ))}
    </Row>
  );
};

export default DeviceList;
