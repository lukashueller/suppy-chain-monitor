import React from "react";
import { Card, Button, Row, Typography } from "antd";

import { DeleteOutlined } from "@ant-design/icons";

const { Text, Title } = Typography;

const SupplierBox = (props) => {
  const { supplier } = props;

  const handleDeletionClick = () => {
    console.log("clicked!" + supplier);
    // TODO: Handle Click in Modelers State
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
