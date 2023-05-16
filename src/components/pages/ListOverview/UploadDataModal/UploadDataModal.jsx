import { Modal, message, Button } from "antd";
import PurchaseDragger from "../../../multiPageComponents/PurchaseDragger/PurchaseDragger";

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
        onCancel={handleOk}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={handleOk} type="primary">
              OK
            </Button>
          </div>
        }
      >
        <PurchaseDragger handleSuccessfulUpload={handleSuccessfulUpload} />
      </Modal>
    </>
  );
};
export default UploadDataModal;
