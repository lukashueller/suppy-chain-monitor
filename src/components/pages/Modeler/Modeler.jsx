import React from "react";
import { Row, Col, Space, Select } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";

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
    <Space
      direction="vertical"
      style={{ backgroundColor: "#E0E0E0", height: "100vh" }}
    >
      <HeaderNavbar selectedKey={1} />
      <Space
        style={{ width: "100vw", padding: "1rem 1rem" }}
        direction="vertical"
        size={"large"}
      >
        <Row style={{ width: "100vw", textAlign: "center" }} align="middle">
          <Col span={3} />
          <Col span={18} style={{ textAlign: "center" }}>
            Are you tired of spending countless hours searching for the right
            suppliers for your business? Do you want to streamline your
            procurement process and save valuable time and resources? Then it's
            time to enter your suppliers into our database!
          </Col>
          <Col span={3} />
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
