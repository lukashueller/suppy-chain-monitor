import React from "react";
import { Divider, Button, Typography, Drawer, Space } from "antd";

const { Text } = Typography;

const SupplierDrawer = (props) => {
  const { open, closeDrawer, companyData } = props;

  const returnCountries = () => {
    if (companyData.countries.length === 0) return <></>;
    const allCountries = companyData.countries.map((country, index) => {
      if (index < companyData.countries.length - 1) {
        return <Text key={index}>{country}, </Text>;
      } else {
        return <Text key={index}>{country}</Text>;
      }
    });
    return (
      <>
        <Text strong>Operating Countries: </Text>
        {allCountries}
      </>
    );
  };

  const returnAllMaterials = () => {
    console.log(companyData.materials);
    if (companyData.materials.length === 0) return <></>;
    const allMaterials = companyData.materials.map((material, index) => {
      if (index < companyData.materials.length - 1) {
        return <Text key={index}>{material}, </Text>;
      } else {
        return <Text key={index}>{material}</Text>;
      }
    });
    return (
      <>
        {" "}
        <Text strong>Purchased Materials: </Text>
        {allMaterials}
      </>
    );
  };

  const returnAboutSection = () => {
    return (
      <>
        <Text strong>Company: </Text>
        <>{companyData.label}</>
        <br />
        <Text strong>Industry: </Text>
        <>{companyData.industry}</>
        <br />
        <Text strong>Contact: </Text>
        <>{companyData.contact}</>
        <br />
        {returnCountries()}
        <br />
        {returnAllMaterials()}
      </>
    );
  };

  const returnRiskSection = () => {
    return <></>;
  };

  const returnGraphSection = () => {
    return (
      <>
        {companyData.tier1.map((company) => {
          return (
            <>
              <>{company}</>
              <br />
            </>
          );
        })}
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
            <a
              href={"mailto:" + companyData.contact}
              target="_blank"
              rel="noopener noreferrer"
            >
              Email Supplier
            </a>
          </Button>
        </Space>
      }
    >
      {returnAboutSection()}
      <Divider>Risks</Divider>
      {returnRiskSection()}
      <Divider>Supplier Network</Divider>
      {returnGraphSection()}
    </Drawer>
  );
};

export default SupplierDrawer;
