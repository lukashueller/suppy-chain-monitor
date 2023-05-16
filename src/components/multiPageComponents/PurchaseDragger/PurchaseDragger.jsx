import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const PurchaseDragger = (props) => {
  const { handleSuccessfulUpload } = props;

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

  return (
    <Dragger {...draggerProps}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click to search your files or drag purchasing EXCEL to this area to upload
      </p>
      <p className="ant-upload-hint">
        Multiple file upload is supported
        <br />
        By uploading files you agree to our Terms & Conditions
      </p>
    </Dragger>
  );
};
export default PurchaseDragger;
