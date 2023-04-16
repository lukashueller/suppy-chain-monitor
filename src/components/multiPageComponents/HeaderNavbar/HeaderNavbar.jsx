import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Row, Space } from "antd";
import { Link } from "react-router-dom";

const HeaderNavbar = (props) => {
  const { selectedKey } = props;
  //const ICON_KEY = 0;
  const SUPPLIER_OVERVIEW_PAGE_KEY = 1;
  const SC_INSIGHTS_PAGE_KEY = 2;

  let onOverview = false;
  let onSCInsights = false;
  if (selectedKey === SUPPLIER_OVERVIEW_PAGE_KEY) {
    onOverview = true;
  }
  if (selectedKey === SC_INSIGHTS_PAGE_KEY) {
    onSCInsights = true;
  }

  const returnOverviewButton = () => {
    if (onOverview) {
      return <Button type="primary">Supplier Overview</Button>;
    } else {
      return (
        <Link to="/modeler">
          <Button>Supplier Overview</Button>
        </Link>
      );
    }
  };

  const returnInsightsButton = () => {
    if (onSCInsights) {
      return <Button type="primary">Supply Chain Insights</Button>;
    } else {
      return (
        <Link to="/insights">
          <Button>Supply Chain Insights</Button>
        </Link>
      );
    }
  };

  return (
    <Row
      style={{
        width: "100vw",
        backgroundColor: "#1A314E",
        padding: "1rem",
        height: "10vh",
      }}
      justify="space-between"
    >
      <Space direction="horizontal">
        <Link to="/">
          <Button
            type="text"
            icon={<HomeOutlined />}
            style={{ color: "white" }}
          />
        </Link>
        <Button type="text" style={{ color: "white" }}>
          About us!
        </Button>
      </Space>

      <Space direction="horizontal">
        {returnOverviewButton()}
        {returnInsightsButton()}
      </Space>

      <Space direction="horizontal">
        <Button type="text" style={{ color: "white" }}>
          Sign Up
        </Button>
        <Button type="text" style={{ color: "white" }}>
          Log In
        </Button>
      </Space>
    </Row>
  );
};

export default HeaderNavbar;
