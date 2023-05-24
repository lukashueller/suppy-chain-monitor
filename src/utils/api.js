async function getAllCompanyNames() {
  try {
    const response = await fetch("https://tierx.onrender.com/all_company_names");
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

async function getCompleteDatabase() {
  try {
    const response = await fetch("https://tierx.onrender.com/");
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return error;
  }
}

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
      console.error(error);
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
      console.error(error);
    });
};

const getDataForCompany = async (companyName) => {
  try {
    const url = "https://tierx.onrender.com/company_data?value=" + companyName;
    const response = await fetch(url);
    const json = await response.json();
    return json.company[0];
  } catch (error) {
    console.error(error);
    return error;
  }

  //const completeDB = JSON.parse(sessionStorage.getItem("completeDB"));
  //return completeDB.companies.find((company) => company.value === companyName);
};

const getLabelForCompany = (companyName) => {
  try {
    return getDataForCompany(companyName).label;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return "";
  }
};

async function getNetworkForCompany(companyName) {
  try {
    //TODO:the api always returns something, even if company name is null
    const response = await fetch("https://tierx.onrender.com/network?company=" + companyName);
    return await response.json();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
    return error;
  }
}

export {
  getAllCompanyNames,
  getCompleteDatabase,
  getDataForCompany,
  getLabelForCompany,
  getNetworkForCompany,
  upsertUserToDatabase,
  updateTierOneSuppliers,
};
