import React, { useEffect, useState } from "react";
import { Row, Col, Space, Select } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";

import { initSessionStorage } from "../../../utils/sessionStorageUtils.js";

const Modeler = () => {
  const [usersTierOneSuppliers, setUsersTierOneSuppliers] = useState([]);

  useEffect(() => {
    initSessionStorage("currentUserId", "80625d115100a2ee8d8e695b");
    /*     getListOfAllSuppliers()
      .then((response) => response.json())
      .then((data) => {
        initSessionStorage("listOfAllSuppliers", JSON.stringify([]));
        sessionStorage.setItem("listOfAllSuppliers", JSON.stringify(data));
      });*/
  }, []);

  useEffect(() => {}, [usersTierOneSuppliers]);

  const newSupplierEntered = (value) => {
    setUsersTierOneSuppliers([...usersTierOneSuppliers, value]);
  };

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

  const returnSupplierBoxes = () => {
    if (usersTierOneSuppliers.length !== 0) {
      return usersTierOneSuppliers.map((val) => {
        return <>{val} </>;
      });
    }
  };

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
          options={supplierArray}
          onChange={(val) => newSupplierEntered(val)}
          allowClear
        />
        {returnSupplierBoxes()}
      </Space>
    </Space>
  );
};

export default Modeler;
