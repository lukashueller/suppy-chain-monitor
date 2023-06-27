import { Modal } from "antd";
import { getDataForCompanyLocal, getLabelForCompany } from "../../../../utils/api";
/* eslint-disable-next-line max-len */
import AboutSection from "../../../multiPageComponents/SupplierInfoSections/AboutSection/AboutSection";
/* eslint-disable-next-line max-len */
import RiskSection from "../../../multiPageComponents/SupplierInfoSections/RiskSection/RiskSection";
/* eslint-disable-next-line max-len */
import AlternativesSection from "../../../multiPageComponents/SupplierInfoSections/AlternativesSection/AlternativesSection";

// import styles from "./NotSignedUpModal.module.css";

const SupplierDetailsModal = (props) => {
  const { open, close, supplierValue } = props;
  const completeDB = JSON.parse(sessionStorage.getItem("completeDB"));

  const handleOk = () => close();

  const companyData = getDataForCompanyLocal(supplierValue, completeDB);

  return (
    <Modal
      title={"More Information about: " + getLabelForCompany(supplierValue, completeDB)}
      open={open}
      onCancel={handleOk}
      /* className={styles.customModal} */
      footer={null}
      width={800}
    >
      <AboutSection companyData={companyData} />
      <RiskSection companyData={companyData} />
      <AlternativesSection companyData={companyData} />
    </Modal>
  );
};
export default SupplierDetailsModal;
