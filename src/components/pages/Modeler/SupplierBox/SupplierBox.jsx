import React, { useEffect, useState } from "react";
import { Card } from "antd";

const SupplierBox = (props) => {
  const { supplier } = props;
  return (
    <Card type="inner" style={{ width: "100%" }}>
      {supplier}
    </Card>
  );
};

export default SupplierBox;
