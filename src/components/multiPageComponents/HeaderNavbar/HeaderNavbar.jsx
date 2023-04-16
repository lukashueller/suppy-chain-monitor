import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Row, Space } from "antd";
import { Link } from "react-router-dom";

const HeaderNavbar = () => {
  return (
    <Row
      style={{
        width: "100vw",
        backgroundColor: "#1A314E",
        padding: "1rem",
        height: "10vh",
      }}
      justify="space-between"
    >
      <Space direction="horizontal">
        <Link to="/">
          <Button
            type="text"
            icon={<HomeOutlined />}
            style={{ color: "white" }}
          />
        </Link>
        <Button type="text" style={{ color: "white" }}>
          About us!
        </Button>
      </Space>

      <Space direction="horizontal">
        <Button> Supplier Overview</Button>
        <Button> Supply Chain Insights</Button>
      </Space>

      <Space direction="horizontal">
        <Button type="text" style={{ color: "white" }}>
          Sign Up
        </Button>
        <Button type="text" style={{ color: "white" }}>
          Log In
        </Button>
      </Space>
    </Row>
  );
};

export default HeaderNavbar;
