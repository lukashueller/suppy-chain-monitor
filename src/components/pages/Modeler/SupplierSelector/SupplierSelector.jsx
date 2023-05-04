import React from "react";
import { Select } from "antd";

const SupplierSelector = (props) => {
  const { usersTierOneSuppliers, isInModal } = props;
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
    console.log(isInModal);
    if (isInModal) {
      setUsersTierOneSuppliers(value);
    } else {
      setUsersTierOneSuppliers([...usersTierOneSuppliers, value]);
    }
  };

  return (
    <Select
      style={{ width: "100%" }}
      showSearch
      placeholder={
        isInModal
          ? "Enter the name of your supplier"
          : "Enter the name of your supplier or use the bulk upload on the right"
      }
      options={filteredOptions}
      onChange={(val) => newSupplierEntered(val)}
    />
  );
};

export default SupplierSelector;
