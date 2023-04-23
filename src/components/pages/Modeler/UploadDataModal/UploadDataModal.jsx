import { Modal, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Dragger } = Upload;

const UploadDataModal = (props) => {
  const { open, close } = props;
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      close();
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    close();
  };

  const handleFileUpload = (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const url = "https://tierx.onrender.com/purchasing_upload";

    return fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          message.success("File uploaded successfully");
          return file;
        } else {
          throw new Error("Failed to upload file");
        }
      })
      .catch((error) => {
        message.error(error.message);
        throw error;
      });
  };

  return (
    <>
      <Modal
        title="Upload Company List or Purchase Data"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Dragger
          accept=".xlsx, .xls"
          maxCount={1}
          onChange={(info) => {
            const { file } = info;
            handleFileUpload(file);
          }}
          action="https://tierx.onrender.com/purchasing_upload"
          method="POST"
          /* beforeUpload={handleFileUpload} */
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
