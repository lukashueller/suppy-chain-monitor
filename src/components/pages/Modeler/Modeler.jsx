import React, { useEffect, useState } from "react";
import { Row, Col, Space, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";
import SupplierBox from "./SupplierBox/SupplierBox.jsx";
import UploadDataModal from "./UploadDataModal/UploadDataModal.jsx";
import SupplierSelector from "./SupplierSelector/SupplierSelector.jsx";

const Modeler = () => {
  const [usersTierOneSuppliers, setUsersTierOneSuppliers] = useState(
    JSON.parse(sessionStorage.getItem("tierOneSuppliers"))
  );
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    sessionStorage.setItem("tierOneSuppliers", JSON.stringify(usersTierOneSuppliers));
  }, [usersTierOneSuppliers]);

  const handleSuccessfulUpload = async (response) => {
    const newSuppliers = [];
    response.company_dist_values.forEach((company) => {
      if (!usersTierOneSuppliers.includes(company)) {
        newSuppliers.push(company);
      }
    });

    setUsersTierOneSuppliers([...usersTierOneSuppliers, newSuppliers].flat());
  };

  const onSupplierDeletion = (supplier) => {
    let newSupplierList = usersTierOneSuppliers;
    newSupplierList = newSupplierList.filter((item) => item !== supplier);
    setUsersTierOneSuppliers(newSupplierList);
  };

  const renderSupplierBoxes = () => {
    if (usersTierOneSuppliers.length !== 0) {
      return usersTierOneSuppliers.map((val, index) => {
        return (
          <SupplierBox
            supplier={val}
            key={index}
            onSupplierDeletion={(supplier) => onSupplierDeletion(supplier)}
          />
        );
      });
    }
  };

  const bulkUploadClick = () => {
    setModalOpen(true);
  };

  return (
    <Space direction="vertical" style={{ backgroundColor: "#E0E0E0", height: "100vh" }}>
      <UploadDataModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        handleSuccessfulUpload={(response) => handleSuccessfulUpload(response)}
      />
      <HeaderNavbar selectedKey={1} />
      <Space style={{ width: "100vw", padding: "1rem" }} direction="vertical" size={"large"}>
        <Row style={{ width: "100vw", textAlign: "center" }}>
          <Col span={3} />
          <Col span={18} style={{ textAlign: "center" }}>
            Are you tired of spending countless hours searching for the right suppliers for your
            business? Do you want to streamline your procurement process and save valuable time and
            resources? Then it's time to enter your suppliers into our database!
          </Col>
          <Col span={3} />
        </Row>

        <Row gutter={16}>
          <Col xs={24} sm={18} xl={20} xxl={22}>
            <SupplierSelector
              usersTierOneSuppliers={usersTierOneSuppliers}
              setUsersTierOneSuppliers={(val) => setUsersTierOneSuppliers(val)}
            />
          </Col>

          <Col xs={24} sm={6} xl={4} xxl={2}>
            <Button type="primary" style={{ width: "100%" }} onClick={() => bulkUploadClick()}>
              <UploadOutlined />
              bulk upload
            </Button>
          </Col>
        </Row>

        <Space direction="vertical" style={{ width: "100%" }}>
          {renderSupplierBoxes()}
        </Space>
      </Space>
    </Space>
  );
};

export default Modeler;
