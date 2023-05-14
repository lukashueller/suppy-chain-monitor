import React, { useState, useEffect } from "react";
import { Row, Modal } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";
import EnterFirstSupplierModal from "./EnterFirstSupplierModal/EnterFirstSupplierModal.jsx";
import NetworkGraph from "../NetworkGraph/NetworkGraph.jsx";
import NotSignedUpModal from "./NotSignedUpModal/NotSignedUpModal.jsx";

const SupplierNetwork = () => {
  const [enterFirstSupplierModalOpen, setEnterFirstSupplierModalOpen] = useState(true);
  const [notSignedInModalOpen, setNotSignedInModalOpen] = useState(false);
  const [singleSupplier, setSingleSupplier] = useState(null);

  const handleNodeClick = (evt) => {
    const userObject = JSON.parse(sessionStorage.getItem("userObject"));
    if (userObject === null) {
      setNotSignedInModalOpen(true);
    } else {
      // open SupplierDetails Modal
    }
  };

  return (
    <Row justify="center" style={{ backgroundColor: "#E0E0E0", height: "100vh" }}>
      <NotSignedUpModal open={notSignedInModalOpen} close={() => setNotSignedInModalOpen(false)} />
      <EnterFirstSupplierModal
        open={enterFirstSupplierModalOpen}
        mask={true}
        close={() => setEnterFirstSupplierModalOpen(false)}
        setSingleSupplier={(singleSupplier) => setSingleSupplier(singleSupplier)}
      />
      <HeaderNavbar selectedKey={2} />
      <NetworkGraph
        rootNodeValue={singleSupplier}
        handleNodeClick={(evt) => handleNodeClick(evt)}
      />
    </Row>
  );
};

export default SupplierNetwork;
