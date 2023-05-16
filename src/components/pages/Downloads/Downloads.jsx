import React from "react";
import HeaderNavbar from "../../multiPageComponents/HeaderNavbar/HeaderNavbar";
import { Col, Typography, Button, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { DownloadOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Downloads = () => {
  let navigate = useNavigate();

  const handleDownload = (filePath, fileName) => {
    const link = document.createElement("a");
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <HeaderNavbar />
      <div className="navbar_background">
        <Col sm={0} md={1} lg={1} xl={1} xxl={2} />
        <Col
          sm={24}
          md={12}
          lg={12}
          xl={8}
          xxl={6}
          style={{
            backgroundColor: "#1A314E",
            marginTop: "0vh",
          }}
        >
          <Col style={{ padding: "2rem" }}>
            <Title style={{ color: "white", marginTop: "0px" }}>TierX Download Area</Title>

            <Space direction="vertical">
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() =>
                  handleDownload("./files/SAP_Purchasing.xlsx", "TierX_purchasing_example.xlsx")
                }
              >
                Purchasing-Example (.xlsx)
                <DownloadOutlined />
              </Button>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={() => handleDownload("./files/SAP_Sales.xlsx", "TierX_sales_example.xlsx")}
              >
                Sales-Example (.xlsx)
                <DownloadOutlined />
              </Button>
              <br />
              <Button onClick={() => navigate(-1)}>Return</Button>
            </Space>
          </Col>
        </Col>
      </div>
    </>
  );
};

export default Downloads;
