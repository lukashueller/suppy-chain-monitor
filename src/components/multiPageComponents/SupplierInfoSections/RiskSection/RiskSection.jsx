/* eslint-disable indent */
import React from "react";
import { Typography, Divider, Space, Card, Row, Col } from "antd";
import { WarningOutlined } from "@ant-design/icons";

const { Text } = Typography;

const RiskSection = (props) => {
  const { companyData } = props;

  const returnRiskSection = () => {
    if (companyData.found_risks.length === 0 || !("found_risks" in companyData)) return null;
    const highRisks = companyData.found_risks.filter((risk) => risk.risk === "high");
    const mediumRisks = companyData.found_risks.filter((risk) => risk.risk === "medium");

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
      const riskDescriptionContainer = (header, text, risk_classification, index) => {
        return (
          <Row key={index}>
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

      return companyData.found_risks.map((risk, index) => {
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
        return riskDescriptionContainer(header, text, risk.risk, index);
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

  return (
    <>
      <Divider>Risks</Divider>
      {returnRiskSection()}
    </>
  );
};

export default RiskSection;
