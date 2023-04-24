import { Modal, Upload, message, Button } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const UploadDataModal = (props) => {
  const { open, close, handleSuccessfulUpload } = props;

  const draggerProps = {
    name: "file",
    multiple: true,
    accept: ".xlsx, .xls",
    method: "POST",
    action: "https://tierx.onrender.com/purchasing_upload?value=infineon_ag",
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        handleSuccessfulUpload(info.file.response);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleOk = () => close();

  return (
    <>
      <Modal
        title="Upload List of Suppliers or Purchase Data"
        open={open}
        onOk={handleOk}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleOk} type="primary">
              OK
            </Button>
          </div>
        }
      >
        <Dragger {...draggerProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or
            other banned files.
          </p>
        </Dragger>
      </Modal>
    </>
  );
};
export default UploadDataModal;
