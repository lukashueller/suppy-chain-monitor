import React, { useState } from "react";
import { Card, Button, Row, Typography, Drawer, Space } from "antd";

import { DeleteOutlined } from "@ant-design/icons";
import { getDataForCompany } from "../../../../utils/api";

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

  const returnDrawer = () => {
    return (
      <Drawer
        title={"More Information about: " + companyData.label}
        size="large"
        onClose={closeDrawer}
        open={open}
        key={index}
        extra={
          <Space>
            <Button onClick={closeDrawer}>Cancel</Button>
          </Space>
        }
      >
        <p>Some contents...</p>
      </Drawer>
    );
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
          <Text strong>{companyData.label}</Text>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => handleDeletionClick()}
          />
        </Row>
      </Card>

      {returnDrawer()}
    </>
  );
};

export default SupplierBox;
