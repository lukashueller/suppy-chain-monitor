import React, { useState } from "react";
import { Card, Button, Row, Typography, Drawer, Space, Tooltip } from "antd";

import {
  DeleteOutlined,
  WarningOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { getDataForCompany } from "../../../../utils/api";
import SupplierDrawer from "../SupplierDrawer/SupplierDrawer";

const { Text, Title } = Typography;

const SupplierBox = (props) => {
  const { supplier, onSupplierDeletion, index } = props;
  const [open, setOpen] = useState(false);

  const companyData = getDataForCompany(supplier);

  const handleDeletionClick = () => {
    onSupplierDeletion(supplier);
  };

  const openDrawer = () => {
    setOpen(true);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const returnRiskIcon = () => {
    if (companyData.estimated_risk === "medium") {
      return (
        <Tooltip title="Medium ESG-Risk Estimated">
          <WarningOutlined style={{ color: "orange" }} />
        </Tooltip>
      );
    }

    if (companyData.estimated_risk === "high") {
      return (
        <Tooltip title="High ESG-Risk Estimated">
          <WarningOutlined style={{ color: "red" }} />
        </Tooltip>
      );
    }
  };

  const returnDataStatusIcon = () => {
    if (companyData.esg_data_status === "from tierx supplier") {
      return (
        <Tooltip title="Uncertain Data Situation">
          <QuestionCircleOutlined style={{ color: "grey" }} />
        </Tooltip>
      );
    }
  };

  return (
    <>
      <Card
        type="inner"
        style={{
          cursor: "pointer",
          boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
          width: "100%",
        }}
        onClick={openDrawer}
      >
        <Row
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Space direction="horizontal">
            <Text strong>{companyData.label}</Text>
            <Text strong> | </Text>
            <Text style={{ color: "grey" }}> {companyData.size} </Text>
          </Space>

          <Space direction="horizontal" size="large">
            {returnDataStatusIcon()}
            {returnRiskIcon()}
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDeletionClick()}
            />
          </Space>
        </Row>
      </Card>

      <SupplierDrawer
        open={open}
        closeDrawer={() => closeDrawer()}
        companyData={companyData}
      />
    </>
  );
};

export default SupplierBox;
