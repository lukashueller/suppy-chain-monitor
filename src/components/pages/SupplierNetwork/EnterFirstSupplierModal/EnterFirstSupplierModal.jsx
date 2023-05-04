import { Modal, Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const EnterFirstSupplierModal = (props) => {
  const { open, close, handleSuccessfulUpload } = props;

  const handleOk = () => close();

  return (
    <>
      <Modal
        title="Get Started by Selecting Your First Supplier"
        open={open}
        closable={false}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleOk} type="primary">
              OK
            </Button>
          </div>
        }
      ></Modal>
    </>
  );
};
export default EnterFirstSupplierModal;
