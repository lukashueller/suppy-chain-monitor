import React from "react";
import { Row, Typography } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";

const { Title } = Typography;

const Modeler = () => {
  return (
    <Row
      justify="center"
      style={{ backgroundColor: "#E0E0E0", height: "100vh" }}
    >
      <HeaderNavbar selectedKey={2} />
      <Title>This page is currently under construction!</Title>
    </Row>
  );
};

export default Modeler;
