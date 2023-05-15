import React from "react";
import { Typography } from "antd";

const { Text } = Typography;

const AboutSection = (props) => {
  const { companyData } = props;

  const returnCountries = () => {
    if (companyData.countries.length === 0) return null;
    const allCountries = companyData.countries.map((country, index) => {
      if (index < companyData.countries.length - 1) {
        return <Text key={index}>{country}, </Text>;
      } else {
        return <Text key={index}>{country}</Text>;
      }
    });
    return (
      <>
        <br />
        <Text strong>Operating Countries: </Text>
        {allCountries}
      </>
    );
  };

  const returnAllMaterials = () => {
    if (companyData.materials.length === 0) return null;
    const allMaterials = companyData.materials.map((material, index) => {
      if (index < companyData.materials.length - 1) {
        return <Text key={index}>{material}, </Text>;
      } else {
        return <Text key={index}>{material}</Text>;
      }
    });
    return (
      <>
        <br />
        <Text strong>Purchased Materials: </Text>
        {allMaterials}
      </>
    );
  };

  const returnDataSituation = () => {
    if (companyData.supplier_source.length === 0) return null;
    const allSources = companyData.supplier_source.map((source, index) => {
      if (index < companyData.supplier_source.length - 1) {
        return <Text key={index}>{source}, </Text>;
      } else {
        return <Text key={index}>{source}</Text>;
      }
    });
    return (
      <>
        <br />
        <Text strong>Data: </Text>
        {allSources}
      </>
    );
  };

  return (
    <>
      <Text strong>Company: </Text>
      <>{companyData.label}</>
      <br />
      <Text strong>Industry: </Text>
      <>{companyData.industry}</>
      <br />
      <Text strong>Contact: </Text>
      <>{companyData.contact}</>
      {returnCountries()}
      {returnAllMaterials()}
      {returnDataSituation()}
    </>
  );
};

export default AboutSection;
