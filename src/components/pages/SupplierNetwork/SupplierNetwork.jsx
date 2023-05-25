import React, { useState, useEffect } from "react";
import { Row } from "antd";

import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar.jsx";
import EnterFirstSupplierModal from "./EnterFirstSupplierModal/EnterFirstSupplierModal.jsx";
import NetworkGraph from "../NetworkGraph/NetworkGraph.jsx";
import NotSignedUpModal from "./NotSignedUpModal/NotSignedUpModal.jsx";
import SupplierDetailsModal from "./SupplierDetailsModal/SupplierDetailsModal.jsx";
import SupplierSelector from "../../multiPageComponents/SupplierSelector/SupplierSelector.jsx";

import { updateTierOneSuppliers } from "../../../utils/api.js";
import BoxKPISection from "./BoxKPISection/BoxKPISection.jsx";

const SupplierNetwork = () => {
  const [notSignedInModalOpen, setNotSignedInModalOpen] = useState(false);
  const [supplierDetailsModalOpen, setSupplierDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [usersTierOneSuppliers, setUsersTierOneSuppliers] = useState(
    JSON.parse(sessionStorage.getItem("tierOneSuppliers"))
  );
  const [enterFirstSupplierModalOpen, setEnterFirstSupplierModalOpen] = useState(
    usersTierOneSuppliers.length === 0 ? true : false
  );

  const handleSuccessfulUpload = async (response) => {
    const newSuppliers = [];
    response.company_dist_values.forEach((company) => {
      if (!usersTierOneSuppliers.includes(company)) {
        newSuppliers.push(company);
      }
    });

    setUsersTierOneSuppliers([...usersTierOneSuppliers, newSuppliers].flat());
  };

  useEffect(() => {
    setLoading(true);
    sessionStorage.setItem("tierOneSuppliers", JSON.stringify(usersTierOneSuppliers));
    updateTierOneSuppliers(usersTierOneSuppliers);
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
    <div align="top" style={{ backgroundColor: "#E0E0E0", height: "100vh" }}>
      <HeaderNavbar selectedKey={2} />
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
        handleSuccessfulUpload={handleSuccessfulUpload}
      />
      <div style={{ padding: "1rem" }}>
        <BoxKPISection supplier={usersTierOneSuppliers} />
        <SupplierSelector
          usersTierOneSuppliers={usersTierOneSuppliers}
          setUsersTierOneSuppliers={(val) => {
            updateTierOneSuppliers(usersTierOneSuppliers);
            setUsersTierOneSuppliers(val);
          }}
          isOnNetworkView={true}
        />
        <NetworkGraph
          tierOneSuppliers={usersTierOneSuppliers}
          handleNodeClick={(evt) => handleNodeClick(evt)}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
};

export default SupplierNetwork;
