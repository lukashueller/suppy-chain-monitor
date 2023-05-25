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

  const dataForCompany = getDataForCompanyLocal(companyName, completeDB);

  let numberOfSuppliers = 1;
  let numberOfHighRiskSuppliers = 0;
  // build basic object frame
  let networkObject = {};
  networkObject.value = companyName;
  networkObject.supplier_source = dataForCompany.supplier_source;
  networkObject.estimated_risk = dataForCompany.estimated_risk;
  networkObject.sales_tier = dataForCompany.sales_tier;
  networkObject.alternatives = dataForCompany.alternatives;

  //build KeyValue Store
  let tierNetwork = {};
  completeDB.companies.forEach((supplier) => (tierNetwork[supplier.value] = supplier.tier1));

  const returnNetworkObjectForSupplier = (supplierRec, visited = new Set()) => {
    visited.add(companyName);
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
    if (!("tier1" in dataForCompanyRec)) return networkObjectRec;

    const tier1Filtered = dataForCompanyRec.tier1.filter((el) => !visited.has(el));

    networkObjectRec.tier1 = tier1Filtered.map((supplier) =>
      returnNetworkObjectForSupplier(supplier, visited)
    );
    networkObjectRec.tier1 = networkObjectRec.tier1.filter((item) => item !== undefined);
    numberOfSuppliers += networkObjectRec.tier1.length;
    //console.log(networkObjectRec.value + " : " + numberOfSuppliers);
    return networkObjectRec;
  };

  networkObject.tier1 = tierNetwork[companyName].map((supplier) => {
    return returnNetworkObjectForSupplier(supplier);
  });

  networkObject.tier1 = networkObject.tier1.filter((item) => item !== undefined);
  numberOfSuppliers += networkObject.tier1.length;

  let mainObject = {};
  mainObject.companies_count = numberOfSuppliers;
  mainObject.high_risk_count = 48;
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
