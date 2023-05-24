import { Modal, List, Button, Typography, Space } from "antd";
import { RightOutlined, CheckCircleOutlined, CloseOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const NotSignedUpModal = (props) => {
  const { open, close } = props;

  const handleOk = () => close();

  const data = [
    "Claim your company profile",
    "Bulk upload & search your suppliers",
    "Get an evaluation of your suppliers",
    "Start receiving alternatives and new solutions to improve your supply chain",
  ];

  return (
    <Modal
      className="modalStyle-dark"
      open={open}
      onCancel={handleOk}
      title={
        <div style={{ color: "white", fontSize: "large" }}>Glad to know you're intrigued!</div>
      }
      closeIcon={<CloseOutlined style={{ color: "white" }} />}
      footer={
        <div style={{ textAlign: "right" }}>
          <Link to="/signup">
            <Button onClick={handleOk} type="primary">
              Sign Up
              <RightOutlined />
            </Button>
          </Link>
        </div>
      }
    >
      <List
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item key={index} style={{ color: "white", borderBottom: "1px solid white" }}>
            <Space direction="horizontal">
              <CheckCircleOutlined />
              {item}
            </Space>
          </List.Item>
        )}
      />
    </Modal>
  );
};
export default NotSignedUpModal;
