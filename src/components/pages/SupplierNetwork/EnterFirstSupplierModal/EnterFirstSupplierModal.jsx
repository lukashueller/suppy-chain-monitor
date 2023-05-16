import React, { useState } from "react";
import { Modal, Button, Typography, Space } from "antd";

import SupplierSelector from "../../../multiPageComponents/SupplierSelector/SupplierSelector";

const { Text } = Typography;

const EnterFirstSupplierModal = (props) => {
  const { open, close, setTierOneSuppliers } = props;
  const [usersTierOneSuppliers, setUsersTierOneSuppliers] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);

  const handleOk = () => {
    if (usersTierOneSuppliers.length === 0) {
      setDisplayAlert(true);
    } else {
      setTierOneSuppliers([usersTierOneSuppliers]);
      setConfirmLoading(true);
      setTimeout(() => {
        close();
        setConfirmLoading(false);
      }, 800);
    }
  };

  return (
    <Modal
      title="Get Started by Selecting Your First Supplier"
      open={open}
      closable={false}
      onOk={handleOk}
      confirmLoading={confirmLoading}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <SupplierSelector
          isInModal={true}
          usersTierOneSuppliers={usersTierOneSuppliers}
          setUsersTierOneSuppliers={(val) => {
            setDisplayAlert(false);
            setUsersTierOneSuppliers(val);
          }}
        />
        {displayAlert ? (
          <Text type="danger" style={{ marginLeft: "0.2rem" }}>
            You have to select a supplier!
          </Text>
        ) : null}
      </Space>
    </Modal>
  );
};
export default EnterFirstSupplierModal;
