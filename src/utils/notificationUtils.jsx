/* eslint-disable indent */

import React from "react";
import { notification } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloudUploadOutlined,
  WarningOutlined,
} from "@ant-design/icons";
//import corporateDesign from '../../layout/corporateDesign';

/**
 * @category Frontend
 * @module
 */

// eslint-disable-next-line consistent-return
const getIconForType = (type, icon, colorName) => {
  switch (icon) {
    case "CloudUploadOutlined":
      return <CloudUploadOutlined style={{ color: "white" }} />;
    default:
      switch (type) {
        case "Success":
          return <CheckCircleOutlined style={{ color: "white" }} />;
        case "Warning":
          return <WarningOutlined style={{ color: "black" }} />;
        case "Error":
          return <CloseCircleOutlined style={{ color: "white" }} />;
        default:
      }
  }
};

const customNotification = (type, message, icon) => {
  const colorName = `color${type}Notification`;

  notification.open({
    message,
    icon: getIconForType(type, icon, colorName),
    style: {
      backgroundColor: "#9fbcdf",
    },
  });
};

export default customNotification;
