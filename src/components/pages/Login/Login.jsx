import React from "react";
import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar";
import { Row, Col, Typography } from "antd";

const { Title } = Typography;

const Login = () => {
  return (
    <Row justify="center" style={{ backgroundColor: "#E0E0E0", height: "100vh" }}>
      <HeaderNavbar selectedKey={0} />
      <Row style={{ width: "100vw" }}>
        <Col sm={24} md={12}>
          <Title>Login Page</Title>
        </Col>
        <Col
          sm={24}
          md={12}
          /* lg={12}
          xl={8}
          xxl={6} */
          className="login-background"
          /* style={{
            backgroundColor: "#1A314E",
            minHeight: "50vh",
            marginTop: "30vh",
          }} */
        ></Col>
      </Row>
    </Row>
  );
};

export default Login;
