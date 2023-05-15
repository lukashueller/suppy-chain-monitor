import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Space, Button, Typography, Row, Col } from "antd";
import { RightOutlined } from "@ant-design/icons";

import { initSessionStorage } from "../../../utils/sessionStorageUtils.js";
import { getCompleteDatabase } from "../../../utils/api.js";

import "./Home.css";

const { Title } = Typography;

const Home = () => {
  initSessionStorage("userObject", JSON.stringify(null));
  initSessionStorage("completeDB", JSON.stringify(null));
  initSessionStorage("tierOneSuppliers", JSON.stringify([]));

  async function fetchCompleteDatabase() {
    const completeDB = await getCompleteDatabase();
    sessionStorage.setItem("completeDB", JSON.stringify(completeDB));
  }

  useEffect(() => {
    fetchCompleteDatabase();
  }, []);

  return (
    <div className="background">
      <Col
        sm={24}
        md={12}
        lg={12}
        xl={8}
        xxl={6}
        style={{
          backgroundColor: "#1A314E",
          minHeight: "50vh",
          marginTop: "30vh",
        }}
      >
        <Col style={{ padding: "2rem" }}>
          <Title style={{ color: "white", marginTop: "0px" }}>
            Welcome to your Supplier Risk Management
          </Title>
          <Title style={{ color: "white" }} level={4}>
            Achieve strategic advantages by comprehending, evaluating and enhancing the risk and
            sustainability of your suppliers.
          </Title>
          <Row>
            <Space direction="horizontal" size="large">
              <Button>Learn more</Button>
              <Link to="/network">
                <Button type="primary">
                  Try it out <RightOutlined />
                </Button>
              </Link>
            </Space>
          </Row>
        </Col>
      </Col>
    </div>
  );
};

export default Home;
