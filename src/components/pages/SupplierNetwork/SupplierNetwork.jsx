import React, { useState } from "react";
import { Row, Typography } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";
import EnterFirstSupplierModal from "./EnterFirstSupplierModal/EnterFirstSupplierModal.jsx";

const { Title } = Typography;

const SupplierNetwork = () => {
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <Row justify="center" style={{ backgroundColor: "#E0E0E0", height: "100vh" }}>
      <EnterFirstSupplierModal
        open={modalOpen}
        mask={true}
        close={() => setModalOpen(false)}
        /* handleSuccessfulUpload={(response) => handleSuccessfulUpload(response)} */
      />
      <HeaderNavbar selectedKey={2} />
      <Title>This page is currently under construction!</Title>
    </Row>
  );
};

export default SupplierNetwork;
