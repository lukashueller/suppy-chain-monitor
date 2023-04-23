import { Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Dragger } = Upload;

const UploadDataModal = (props) => {
  const { open, close, handleSuccessfulUpload } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      close();
      setConfirmLoading(false);
    }, 20);
  };

  const handleCancel = () => {
    close();
  };

  return (
    <>
      <Modal
        title="Upload List of Suppliers or Purchase Data"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Dragger
          accept=".xlsx, .xls"
          maxCount={1}
          action="https://tierx.onrender.com/purchasing_upload"
          method="POST"
          onSuccess={(response) => handleSuccessfulUpload(response)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      </Modal>
    </>
  );
};
export default UploadDataModal;
