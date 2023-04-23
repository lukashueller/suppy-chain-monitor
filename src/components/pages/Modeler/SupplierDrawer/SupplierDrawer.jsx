import React from "react";
import { Divider, Button, Typography, Drawer, Space, Card } from "antd";
import { WarningOutlined } from "@ant-design/icons";

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
        <br />
        <Text strong>Operating Countries: </Text>
        {allCountries}
      </>
    );
  };

  const returnAllMaterials = () => {
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
        <br />
        <Text strong>Purchased Materials: </Text>
        {allMaterials}
      </>
    );
  };

  const returnSources = () => {
    if (companyData.esg_data.length === 0) return <></>;
    const allSources = companyData.esg_data.map((source, index) => {
      if (index < companyData.esg_data.length - 1) {
        return (
          <Text key={index}>
            <a href={source.link}>{source.source}</a>,{" "}
          </Text>
        );
      } else {
        return (
          <Text key={index}>
            <a href={source.link}>{source.source}</a>
          </Text>
        );
      }
    });
    return (
      <>
        <Text strong>Sources: </Text>
        {allSources}
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
        {returnCountries()}
        {returnAllMaterials()}
      </>
    );
  };

  const returnRiskSection = () => {
    console.log(companyData);
    if (companyData.found_risks.length === 0 || !("found_risks" in companyData)) return <></>;
    const highRisks = companyData.found_risks.filter((risk) => risk.risk === "high");
    const mediumRisks = companyData.found_risks.filter((risk) => risk.risk === "medium");

    const returnRiskCard = (type, color, numberOfCases) => {
      return (
        <>
          <Card
            type="inner"
            style={{
              width: "100%",
              backgroundColor: color,
            }}
          >
            <Space direction="horizontal">
              <WarningOutlined />
              {numberOfCases +
                " " +
                type.toUpperCase() +
                " RISK" +
                (numberOfCases > 1 ? "S" : "") +
                " DETECTED!"}
            </Space>
          </Card>
        </>
      );
    };

    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {returnRiskCard("high", "rgba(234, 84, 85, 0.7)", highRisks.length)}
        {returnRiskCard("medium", "rgba(255,165,0, 0.7)", mediumRisks.length)}
        <div style={{ whiteSpace: "nowrap" }}>{returnSources()}</div>
      </Space>
    );
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
            <a href={"mailto:" + companyData.contact} target="_blank" rel="noopener noreferrer">
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
