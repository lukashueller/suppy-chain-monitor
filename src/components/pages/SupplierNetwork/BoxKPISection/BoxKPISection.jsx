import React, { useState, useEffect } from "react";
import { Row, Col, Typography, Skeleton } from "antd";

import {
  getCompleteDatabase,
  getNetworkForCompany2,
  updateTierOneSuppliers,
} from "../../../../utils/api";
import "../SupplierNetwork.modules.css";

const { Text } = Typography;

const BoxKPISection = (props) => {
  const { supplier } = props;

  const [numberSuppliers, setNumberSuppliers] = useState(null);
  const [numberHighRisk, setNumberHighRisk] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFetch = async () => {
    const username = JSON.parse(sessionStorage.getItem("userObject"));
    if (username === null) return null;

    await updateTierOneSuppliers(supplier);
    const completeDB = await getCompleteDatabase();
    sessionStorage.setItem("completeDB", JSON.stringify(completeDB));
    const network = await getNetworkForCompany2(username.backendUserValue);

    setNumberSuppliers(network.companies_count);
    setNumberHighRisk(network.high_risk_count);
  };

  useEffect(() => {
    setIsLoading(true);
    handleFetch().then(() => setIsLoading(false));
  }, [supplier]);

  if (JSON.parse(sessionStorage.getItem("userObject")) === null) return null;

  return (
    <Row gutter={16} style={{ marginBottom: "1rem" }}>
      <Col className="gutter-row" span={6}>
        <Col className="highlight-box">
          {isLoading ? (
            <Skeleton.Input active />
          ) : (
            <Text strong style={{ fontSize: "2rem" }}>
              {numberSuppliers === 0 ? 1 : (numberHighRisk / numberSuppliers).toFixed(3)}
            </Text>
          )}
          <Text>Your Risk Score</Text>
        </Col>
      </Col>
      <Col className="gutter-row" span={6}>
        <Col className="highlight-box">
          {isLoading ? (
            <Skeleton.Input active />
          ) : (
            <Text strong style={{ fontSize: "2rem" }}>
              {numberSuppliers}
            </Text>
          )}
          <Text>Number Of Unique Suppliers</Text>
        </Col>
      </Col>
      <Col className="gutter-row" span={6}>
        <Col className="highlight-box">
          {isLoading ? (
            <Skeleton.Input active />
          ) : (
            <Text strong style={{ fontSize: "2rem" }}>
              {numberHighRisk}
            </Text>
          )}
          <Text>High Risk Suppliers</Text>
        </Col>
      </Col>
      <Col className="gutter-row" span={6}>
        <Col className="highlight-box">
          {isLoading ? (
            <Skeleton.Input active />
          ) : (
            <Text strong style={{ fontSize: "2rem" }}>
              {Math.floor(Math.random() * 8)}
            </Text>
          )}
          <Text>Recommendations</Text>
        </Col>
      </Col>
    </Row>
  );
};

export default BoxKPISection;
