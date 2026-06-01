import React from "react";
import bigStar from "../../assets/bigStar.png";
import { Row } from "react-bootstrap";

const DeviceRating = ({ device }) => {
  return (
    <Row className="d-flex flex-column align-items-center">
      <h2>{device.name}</h2>
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          background: `url(${bigStar}) no-repeat center center`,
          width: "240px",
          height: "240px",
          backgroundSize: "cover",
          fontSize: "64px",
        }}
      >
        {device.rating}
      </div>
    </Row>
  );
};

export default DeviceRating;
