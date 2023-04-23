import React from "react";
import { Card, Button, Row, Typography, Drawer, Space } from "antd";

const { Text, Title } = Typography;

const SupplierDrawer = (props) => {
  const { open, closeDrawer, companyData } = props;

  return (
    <Drawer
      title={"More Information about: " + companyData.label}
      size="large"
      onClose={closeDrawer}
      open={open}
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

export default SupplierDrawer;
