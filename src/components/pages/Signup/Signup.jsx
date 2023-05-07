import React from "react";
import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar";
import { Row, Col, Typography, Space, Button, Form, Input } from "antd";

const { Title, Text } = Typography;

const Signup = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <HeaderNavbar />
      <div className="background">
        <Col
          sm={0}
          md={1}
          lg={1}
          xl={1}
          xxl={2}
          /* style={{
          backgroundColor: "white",
          minHeight: "50vh",
          marginTop: "30vh",
        }} */
        />
        <Col
          sm={24}
          md={12}
          lg={12}
          xl={8}
          xxl={6}
          style={{
            backgroundColor: "#1A314E",
            marginTop: "0vh",
          }}
        >
          <Col style={{ padding: "2rem" }}>
            <Title style={{ color: "white", marginTop: "0px" }}>TierX Signup</Title>

            <Form name="basic" onFinish={onFinish}>
              <Text style={{ color: "white" }}>Username</Text>
              <Form.Item
                name="username"
                rules={[{ required: "true", message: "Please input your username!" }]}
              >
                <Input />
              </Form.Item>

              <Text style={{ color: "white" }}>Company Email</Text>
              <Form.Item
                name="email"
                rules={[{ required: "true", message: "Please input your email!" }]}
              >
                <Input type="email" />
              </Form.Item>

              <Text style={{ color: "white" }}>Company Name</Text>
              <Form.Item
                name="company_name"
                rules={[{ required: "true", message: "Please input the name of your company!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item style={{ textAlign: "center" }}>
                <Button style={{ width: "50%" }} htmlType="submit">
                  Confirm
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Col>
      </div>
    </>
  );
};

export default Signup;
