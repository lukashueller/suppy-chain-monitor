import React from "react";
import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar";
import { Row, Typography } from "antd";

const { Title } = Typography;

const Error = () => {
  return (
    <Row
      justify="center"
      style={{ backgroundColor: "#E0E0E0", height: "100vh" }}
    >
      <HeaderNavbar selectedKey={0} />
      <Title>The page you are looking for does not exist</Title>
    </Row>
  );
};

export default Error;
