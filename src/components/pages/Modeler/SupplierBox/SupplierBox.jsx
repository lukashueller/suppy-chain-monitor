import React from "react";
import { Card, Button, Row, Typography } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const SupplierBox = (props) => {
  const { supplier, onSupplierDeletion } = props;

  const handleDeletionClick = () => {
    onSupplierDeletion(supplier);
  };

  return (
    <Card type="inner" style={{ width: "100%" }}>
      <Row
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text strong>{supplier}</Text>
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDeletionClick()}
        />
      </Row>
    </Card>
  );
};

export default SupplierBox;
