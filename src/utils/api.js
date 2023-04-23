async function getAllCompanyNames() {
  try {
    const response = await fetch(
      "https://tierx.onrender.com/all_company_names"
    );
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

async function getCompleteDatabase() {
  try {
    const response = await fetch("https://tierx.onrender.com/");
    return await response.json();
  } catch (error) {
    console.error(error);
    return error;
  }
}

export { getAllCompanyNames, getCompleteDatabase };
