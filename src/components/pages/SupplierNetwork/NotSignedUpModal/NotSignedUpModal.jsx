import { Modal, List, Button, Typography, Space } from "antd";
import { RightOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

// import styles from "./NotSignedUpModal.module.css";

const { Text } = Typography;

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
      title="Glad to know you're intrigued!"
      open={open}
      onCancel={handleOk}
      /* className={styles.customModal} */
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
          <List.Item key={index}>
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
