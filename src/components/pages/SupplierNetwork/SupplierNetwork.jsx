import React, { useState, useEffect } from "react";
import { Row } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";
import EnterFirstSupplierModal from "./EnterFirstSupplierModal/EnterFirstSupplierModal.jsx";
import NetworkGraph from "../NetworkGraph/NetworkGraph.jsx";

const SupplierNetwork = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [singleSupplier, setSingleSupplier] = useState(null);

  return (
    <Row justify="center" style={{ backgroundColor: "#E0E0E0", height: "100vh" }}>
      <EnterFirstSupplierModal
        open={modalOpen}
        mask={true}
        close={() => setModalOpen(false)}
        setSingleSupplier={(singleSupplier) => setSingleSupplier(singleSupplier)}
      />
      <HeaderNavbar selectedKey={2} />
      <NetworkGraph rootNodeValue={singleSupplier} />
    </Row>
  );
};

export default SupplierNetwork;
