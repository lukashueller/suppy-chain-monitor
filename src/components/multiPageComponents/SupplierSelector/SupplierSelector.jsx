import React from "react";
import { Select } from "antd";

const SupplierSelector = (props) => {
  const { usersTierOneSuppliers, isInModal, isOnNetworkView } = props;
  const setUsersTierOneSuppliers = (val) => props.setUsersTierOneSuppliers(val);

  const returnSupplierListForDropdown = () => {
    const completeDB = JSON.parse(sessionStorage.getItem("completeDB"));
    if (completeDB === null) return [];
    return completeDB.companies.map((el) => {
      return { label: el.label, value: el.value };
    });
  };

  const filteredOptions = returnSupplierListForDropdown().map((el) => {
    if (!usersTierOneSuppliers.includes(el.value)) {
      return { value: el.value, label: el.label, disabled: false };
    }
    return { value: el.value, label: el.label, disabled: true };
  });

  const newSupplierEntered = (value) => {
    if (isInModal) {
      setUsersTierOneSuppliers(value);
    } else {
      setUsersTierOneSuppliers([...usersTierOneSuppliers, value]);
    }
  };

  const returnPlaceholderText = () => {
    if (isInModal) {
      return "Enter the name of your supplier";
    } else if (isOnNetworkView) {
      return "Add more suppliers";
    } else {
      return "Enter the name of your supplier or use the bulk upload on the right";
    }
  };

  return (
    <Select
      style={{ width: "100%" }}
      showSearch
      placeholder={returnPlaceholderText()}
      options={filteredOptions}
      onChange={(val) => newSupplierEntered(val)}
    />
  );
};

export default SupplierSelector;
