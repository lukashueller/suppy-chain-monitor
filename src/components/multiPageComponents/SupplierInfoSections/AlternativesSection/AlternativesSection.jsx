/* eslint-disable indent */
import React from "react";
import { Typography, Divider, Space, Card, Row, Col } from "antd";
import { WarningOutlined } from "@ant-design/icons";

const { Text } = Typography;

const AlternativesSection = (props) => {
  const { companyData } = props;

  const returnAlternativesSection = () => {
    /*  TODO: Get Full Company Name (from value-reference) */
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

  return (
    <>
      <Divider>Alternatives</Divider>
      {returnAlternativesSection()}
    </>
  );
};

export default AlternativesSection;
