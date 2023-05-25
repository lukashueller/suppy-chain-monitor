const getAllCompanyNames = async () => {
  try {
    const response = await fetch("https://tierx.onrender.com/all_company_names");
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error;
  }
};

const getCompleteDatabase = async () => {
  try {
    const response = await fetch("https://tierx.onrender.com/");
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error;
  }
};

const upsertUserToDatabase = async (data, userTierOneSuppliers) => {
  await fetch("https://tierx.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_object: data, userTierOneSuppliers: userTierOneSuppliers }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      let userObject = JSON.parse(sessionStorage.getItem("userObject"));
      userObject.backendUserValue = responseData.value;
      sessionStorage.setItem("userObject", JSON.stringify(userObject));

      // eslint-disable-next-line no-console
      console.log(responseData);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
    });
};

const updateTierOneSuppliers = (tierOneSuppliers) => {
  const user_object = JSON.parse(sessionStorage.getItem("userObject"));
  fetch("https://tierx.onrender.com/overwrite_company_tiers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_object: user_object, userTierOneSuppliers: tierOneSuppliers }),
  })
    .then((response) => response.json())
    .then((responseData) => {
      // eslint-disable-next-line no-console
      console.log(responseData);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.warn(error);
    });
};

const getDataForCompany = async (companyName) => {
  try {
    const url = "https://tierx.onrender.com/company_data?value=" + companyName;
    const response = await fetch(url);
    const json = await response.json();
    return json.company[0];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error;
  }

  //const completeDB = JSON.parse(sessionStorage.getItem("completeDB"));
  //return completeDB.companies.find((company) => company.value === companyName);
};

const getDataForCompanyLocal = (companyName, completeDB) => {
  return completeDB.companies.find((company) => company.value === companyName);
};

const getLabelForCompany = (companyName, completeDB) => {
  try {
    return getDataForCompanyLocal(companyName, completeDB).label;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return "";
  }
};

const getNetworkForCompany = async (companyName) => {
  try {
    //TODO:the api always returns something, even if company name is null
    const response = await fetch("https://tierx.onrender.com/network?company=" + companyName);
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error;
  }
};

const getNetworkForCompany2 = (companyName) => {
  const completeDB = JSON.parse(sessionStorage.getItem("completeDB"));

  let suppliers = new Set();
  let highRiskSuppliers = new Set();

  const returnNetworkObjectForSupplier = (supplierRec, visited = new Set()) => {
    if (visited.has(supplierRec)) {
      return;
    }
    visited.add(supplierRec);

    let networkObjectRec = {};
    const dataForCompanyRec = getDataForCompanyLocal(supplierRec, completeDB);

    networkObjectRec.value = supplierRec;
    networkObjectRec.supplier_source = dataForCompanyRec.supplier_source;
    networkObjectRec.estimated_risk = dataForCompanyRec.estimated_risk;
    networkObjectRec.sales_tier = dataForCompanyRec.sales_tier;
    networkObjectRec.alternatives = dataForCompanyRec.alternatives;

    suppliers.add(supplierRec);

    if (dataForCompanyRec.estimated_risk === "high") highRiskSuppliers.add(supplierRec);

    if (!("tier1" in dataForCompanyRec)) return networkObjectRec;

    const tier1Filtered = dataForCompanyRec.tier1.filter((el) => !visited.has(el));

    networkObjectRec.tier1 = tier1Filtered.map((supplier) =>
      returnNetworkObjectForSupplier(supplier, visited)
    );
    networkObjectRec.tier1 = networkObjectRec.tier1.filter((item) => item !== undefined);
    return networkObjectRec;
  };

  let networkObject = returnNetworkObjectForSupplier(companyName);

  suppliers.delete(companyName);
  highRiskSuppliers.delete(companyName);

  let mainObject = {};
  mainObject.companies_count = suppliers.size;
  mainObject.high_risk_count = highRiskSuppliers.size;
  mainObject.tiers = 8;
  mainObject.network = networkObject;
  return mainObject;
};

export {
  getAllCompanyNames,
  getCompleteDatabase,
  getDataForCompany,
  getDataForCompanyLocal,
  getLabelForCompany,
  getNetworkForCompany,
  getNetworkForCompany2,
  upsertUserToDatabase,
  updateTierOneSuppliers,
};
