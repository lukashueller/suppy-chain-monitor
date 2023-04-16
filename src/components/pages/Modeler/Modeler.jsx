import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Row, Col, Space, Select } from "antd";
import { Link } from "react-router-dom";

const Modeler = () => {
  const supplierArray = [
    {
      value: "mercedes_benz",
      label: "Mercedes Benz",
    },
    {
      value: "siemens",
      label: "Siemens",
    },
    {
      value: "schrauben_achim",
      label: "Schrauben Achim",
    },
  ];

  return (
    <Space direction="vertical">
      <Row
        style={{
          width: "100vw",
          backgroundColor: "#1A314E",
          padding: "1rem",
        }}
        justify="space-between"
      >
        <Space direction="horizontal">
          <Link to="/">
            <Button type="primary" icon={<HomeOutlined />} />
          </Link>
          <Button> About us!</Button>
        </Space>

        <Space direction="horizontal">
          <Button> Supplier Overview</Button>
          <Button> Supply Chain Insights</Button>
        </Space>

        <Space direction="horizontal">
          <Button> Sign Up</Button>
          <Button> Log In</Button>
        </Space>
      </Row>
      <Space style={{ width: "100vw", padding: "1rem" }} direction="vertical">
        <Row style={{ width: "100vw", textAlign: "center" }} align="middle">
          <Col span={24} style={{ textAlign: "center" }}>
            Hier könnte Ihr Text stehen!
          </Col>
        </Row>
        <Select
          style={{ width: "100%" }}
          showSearch
          placeholder="Enter the name of your supplier"
          /*onSearch={onSearch}*/
          options={supplierArray}
        />
      </Space>
    </Space>
  );
};

export default Modeler;
