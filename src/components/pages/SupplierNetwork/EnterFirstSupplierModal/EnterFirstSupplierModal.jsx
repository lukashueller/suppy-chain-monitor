import React, { useState } from "react";
import { Modal, Typography, Space, Divider } from "antd";

import SupplierSelector from "../../../multiPageComponents/SupplierSelector/SupplierSelector";
import PurchaseDragger from "../../../multiPageComponents/PurchaseDragger/PurchaseDragger";

const { Text } = Typography;

const EnterFirstSupplierModal = (props) => {
  const { open, close, setTierOneSuppliers, handleSuccessfulUpload } = props;
  const [usersTierOneSuppliers, setUsersTierOneSuppliers] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [successfulUpload, setSuccessfulUpload] = useState(false);

  const handleOk = () => {
    if (usersTierOneSuppliers.length === 0 && !successfulUpload) {
      setDisplayAlert(true);
      return;
    } else if (!successfulUpload) {
      setTierOneSuppliers([usersTierOneSuppliers]);
    }

    setConfirmLoading(true);
    setTimeout(() => {
      close();
      setConfirmLoading(false);
    }, 800);
  };

  return (
    <Modal
      title="Get Started by Selecting Your First Supplier"
      open={open}
      closable={false}
      onOk={handleOk}
      width={600}
      confirmLoading={confirmLoading}
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Space direction="vertical" style={{ width: "100%", paddingTop: "1rem" }}>
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
        <Divider>or</Divider>
        <PurchaseDragger
          handleSuccessfulUpload={(response) => {
            handleSuccessfulUpload(response);
            setSuccessfulUpload(true);
            setDisplayAlert(false);
          }}
        />
      </Space>
    </Modal>
  );
};
export default EnterFirstSupplierModal;
