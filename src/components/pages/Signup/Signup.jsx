import React from "react";
import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar";
import { Col, Typography, Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { upsertUserToDatabase } from "../../../utils/api";

const { Title, Text } = Typography;

const Signup = () => {
  let navigate = useNavigate();

  const onFinish = async (values) => {
    sessionStorage.setItem("userObject", JSON.stringify(values));
    await upsertUserToDatabase(values, JSON.parse(sessionStorage.getItem("tierOneSuppliers")));
    navigate(-1);
  };

  return (
    <>
      <HeaderNavbar />
      <div className="navbar_background">
        <Col sm={0} md={1} lg={1} xl={1} xxl={2} />
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
          <Col style={{ padding: "2rem 2rem 0rem" }}>
            <Title style={{ color: "white", marginTop: "0px" }}>TierX Signup</Title>

            <Form name="basic" onFinish={onFinish}>
              <Text style={{ color: "white" }}>Your Name</Text>
              <Form.Item
                name="name_user"
                rules={[{ required: "true", message: "Please input your name!" }]}
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
