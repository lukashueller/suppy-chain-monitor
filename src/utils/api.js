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

const upsertUserToDatabase = (data) => {
  fetch("https://tierx.onrender.com/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
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

const getDataForCompany = (companyName) => {
  /* try {
    const url = "https://tierx.onrender.com/company_data?value=" + companyName;
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  } */

  const completeDB = JSON.parse(sessionStorage.getItem("completeDB"));
  return completeDB.companies.find((company) => company.value === companyName);
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
};
