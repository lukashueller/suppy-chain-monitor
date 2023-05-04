import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Button, Row, Space, Grid } from "antd";
import { Link } from "react-router-dom";

import customNotification from "../../../utils/notificationUtils";

const { useBreakpoint } = Grid;

const HeaderNavbar = (props) => {
  const screens = useBreakpoint();

  const { selectedKey } = props;
  //const ICON_KEY = 0;
  const SUPPLIER_OVERVIEW_PAGE_KEY = 1;
  const SC_NETWORK_PAGE_KEY = 2;

  let onOverview = false;
  let onSCNetwork = false;
  if (selectedKey === SUPPLIER_OVERVIEW_PAGE_KEY) {
    onOverview = true;
  }
  if (selectedKey === SC_NETWORK_PAGE_KEY) {
    onSCNetwork = true;
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

  const returnNetworkButton = () => {
    if (onSCNetwork) {
      return <Button type="primary">Supplier Network</Button>;
    } else {
      return (
        <Link to="/network">
          <Button>Supplier Network</Button>
        </Link>
      );
    }
  };

  const handleButtonClick = () => {
    customNotification("Warning", "The functionality of this page is currently not implemented");
  };

  const returnWideNavbar = () => {
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
            <Button type="text" icon={<HomeOutlined />} style={{ color: "white" }} />
          </Link>
          <Button type="text" style={{ color: "white" }} onClick={() => handleButtonClick()}>
            About us!
          </Button>
        </Space>

        <Space direction="horizontal">
          {returnNetworkButton()}
          {returnOverviewButton()}
        </Space>

        <Space direction="horizontal">
          <Button type="text" style={{ color: "white" }} onClick={() => handleButtonClick()}>
            Sign Up
          </Button>
          <Link to="/login">
            <Button type="text" style={{ color: "white" }}>
              Log In
            </Button>
          </Link>
        </Space>
      </Row>
    );
  };

  const returnMobileSidebar = () => {
    // TODO
  };

  return <>{returnWideNavbar()}</>;
  //TODO: return <>{screens.md ? returnWideNavbar() : returnMobileSidebar()}</>;
};

export default HeaderNavbar;
