import React from "react";
import { Divider, Button, Drawer, Space } from "antd";
import NetworkGraph from "../../NetworkGraph/NetworkGraph";
/* eslint-disable-next-line max-len */
import AboutSection from "../../../multiPageComponents/SupplierInfoSections/AboutSection/AboutSection";
/* eslint-disable-next-line max-len */
import RiskSection from "../../../multiPageComponents/SupplierInfoSections/RiskSection/RiskSection";
/* eslint-disable-next-line max-len */
import AlternativesSection from "../../../multiPageComponents/SupplierInfoSections/AlternativesSection/AlternativesSection";

const SupplierDrawer = (props) => {
  const { open, closeDrawer, companyData } = props;

  const returnGraphSection = () => {
    return (
      <>
        <NetworkGraph tierOneSuppliers={[companyData.value]} usedInDrawer={true} />
        {/* <Button style={{ width: "100%" }}>
              See simulation of company's supply chain network
            </Button> */}
      </>
    );
  };

  return (
    <Drawer
      title={"More Information about: " + companyData.label}
      size="large"
      onClose={closeDrawer}
      open={open}
      extra={
        <Space>
          <Button type="primary">
            <a href={"mailto:" + companyData.contact} target="_blank" rel="noopener noreferrer">
              Email Supplier
            </a>
          </Button>
        </Space>
      }
    >
      <AboutSection companyData={companyData} />
      <RiskSection companyData={companyData} />
      <AlternativesSection companyData={companyData} />
      <Divider>Supplier Network</Divider>
      {returnGraphSection()}
    </Drawer>
  );
};

export default SupplierDrawer;
