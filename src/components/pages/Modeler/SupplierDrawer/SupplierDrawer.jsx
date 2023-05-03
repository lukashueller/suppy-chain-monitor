/* eslint-disable indent */

import React from "react";
import { Divider, Button, Typography, Drawer, Space, Card, Col, Row } from "antd";
import { WarningOutlined } from "@ant-design/icons";
import NetworkGraph from "../../NetworkGraph/NetworkGraph";

const { Text } = Typography;

const SupplierDrawer = (props) => {
  const { open, closeDrawer, companyData } = props;

  const returnCountries = () => {
    if (companyData.countries.length === 0) return null;
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
    if (companyData.materials.length === 0) return null;
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
    if (companyData.esg_data.length === 0) return null;
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

  const returnDataSituation = () => {
    //if (!("supplier_source" in companyData)) return null;
    if (companyData.supplier_source.length === 0) return null;
    const allSources = companyData.supplier_source.map((source, index) => {
      if (index < companyData.supplier_source.length - 1) {
        return <Text key={index}>{source}, </Text>;
      } else {
        return <Text key={index}>{source}</Text>;
      }
    });
    return (
      <>
        <br />
        <Text strong>Data: </Text>
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
        {returnDataSituation()}
      </>
    );
  };

  const returnRiskSection = () => {
    if (companyData.found_risks.length === 0 || !("found_risks" in companyData)) return null;
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

    const returnRiskDescriptions = () => {
      const riskDescriptionContainer = (header, text, risk_classification) => {
        return (
          <Row>
            <Col span={1} style={{ height: "100%", paddingLeft: "0.5rem" }}>
              <WarningOutlined
                style={{ color: risk_classification === "high" ? "red" : "orange" }}
              />
            </Col>
            <Col span={23}>
              <Text strong>{header}</Text>: <Text>{text}</Text>
            </Col>
          </Row>
        );
      };

      return companyData.found_risks.map((risk) => {
        let esg_type_dict = { E: "Environmental", S: "Social", G: "Governmental" };
        const header =
          esg_type_dict[risk.esg_type] +
          " (" +
          risk.type.charAt(0).toUpperCase() +
          risk.type.slice(1).replaceAll("_", " ") +
          ")";

        let data_point = "";
        switch (risk.type) {
          case "strikes":
            data_point = "Strikes in 3 months: " + risk.strikes_in_last3_months;
            break;
          case "child_labour":
            data_point = "Child labour hits: " + risk.child_labour_hits;
            break;
          case "demographic_change":
            data_point = "Average age: " + risk.average_age;
            break;
          case "geo_risks":
            data_point = "Unsafe countries: " + risk.unsafe_countries;
            break;
        }
        const text = risk.description + " (" + data_point + ")";

        if (risk.risk === "low") return null;
        return <>{riskDescriptionContainer(header, text, risk.risk)}</>;
      });
    };

    return (
      <Space direction="vertical" style={{ width: "100%" }}>
        {highRisks.length > 0
          ? returnRiskCard("high", "rgba(234, 84, 85, 0.7)", highRisks.length)
          : null}
        {mediumRisks.length > 0
          ? returnRiskCard("medium", "rgba(255,165,0, 0.7)", mediumRisks.length)
          : null}
        {returnRiskDescriptions()}
        <div style={{ whiteSpace: "nowrap" }}>{returnSources()}</div>
      </Space>
    );
  };

  const returnAlternativesSection = () => {
    /*  TODO: Get Full Company Name (aus value-Referenz) */
    if (companyData.alternatives.length === 0) return <i>currently unmatched</i>;
    const allAlternatives = companyData.alternatives.map((alternative, index) => {
      if (index < companyData.alternatives.length - 1) {
        return <Text key={index}>{alternative}, </Text>;
      } else {
        return <Text key={index}>{alternative}</Text>;
      }
    });
    return (
      <>
        <br />
        <Text strong>Alternatives: </Text>
        {allAlternatives}
      </>
    );
  };

  const returnGraphSection = () => {
    return (
      <>
        <NetworkGraph rootNodeValue={companyData.value} />
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
      {returnAboutSection()}
      <Divider>Risks</Divider>
      {returnRiskSection()}
      <Divider>Alternatives</Divider>
      {returnAlternativesSection()}
      <Divider>Supplier Network</Divider>
      {returnGraphSection()}
    </Drawer>
  );
};

export default SupplierDrawer;
