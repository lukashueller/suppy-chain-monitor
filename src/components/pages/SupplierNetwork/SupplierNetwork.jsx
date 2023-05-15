import React, { useState, useEffect } from "react";
import { Row } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";
import EnterFirstSupplierModal from "./EnterFirstSupplierModal/EnterFirstSupplierModal.jsx";
import NetworkGraph from "../NetworkGraph/NetworkGraph.jsx";
import NotSignedUpModal from "./NotSignedUpModal/NotSignedUpModal.jsx";
import SupplierDetailsModal from "./SupplierDetailsModal/SupplierDetailsModal.jsx";

const SupplierNetwork = () => {
  const [notSignedInModalOpen, setNotSignedInModalOpen] = useState(false);
  const [supplierDetailsModalOpen, setSupplierDetailsModalOpen] = useState(false);
  const [usersTierOneSuppliers, setUsersTierOneSuppliers] = useState(
    JSON.parse(sessionStorage.getItem("tierOneSuppliers"))
  );
  const [enterFirstSupplierModalOpen, setEnterFirstSupplierModalOpen] = useState(
    usersTierOneSuppliers.length === 0 ? true : false
  );

  useEffect(() => {
    sessionStorage.setItem("tierOneSuppliers", JSON.stringify(usersTierOneSuppliers));
  }, [usersTierOneSuppliers]);

  const handleNodeClick = (evt) => {
    const userObject = JSON.parse(sessionStorage.getItem("userObject"));
    if (userObject === null) {
      setNotSignedInModalOpen(true);
    } else {
      setSupplierDetailsModalOpen(true);
    }
  };

  return (
    <Row justify="center" style={{ backgroundColor: "#E0E0E0", height: "100vh" }}>
      <NotSignedUpModal open={notSignedInModalOpen} close={() => setNotSignedInModalOpen(false)} />
      <SupplierDetailsModal
        open={supplierDetailsModalOpen}
        close={() => setSupplierDetailsModalOpen(false)}
        supplierValue={"bosch_gmbh"}
      />
      <EnterFirstSupplierModal
        open={enterFirstSupplierModalOpen}
        mask={true}
        close={() => setEnterFirstSupplierModalOpen(false)}
        setTierOneSuppliers={(tierOneSuppliers) => {
          setUsersTierOneSuppliers(tierOneSuppliers);
        }}
      />
      <HeaderNavbar selectedKey={2} />
      <NetworkGraph
        rootNodeValue={usersTierOneSuppliers[0] /*TODO: FULL GRAPH*/}
        handleNodeClick={(evt) => handleNodeClick(evt)}
      />
    </Row>
  );
};

export default SupplierNetwork;
