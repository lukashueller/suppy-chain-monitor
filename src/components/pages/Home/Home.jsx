import "./Home.css";

import React from "react";
import { Space, Button, Typography, Row, Col } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title } = Typography;

const Home = () => {
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
