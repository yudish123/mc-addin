const { BASE_URL } = require("../utils");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function allPdfTablesApi(file_name) {
  try {
    const token = await getItem("accessToken");
    console.log(token);
    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }
    const url = `${BASE_URL}/all_pdf_tables/`;

    const userDataStr = await OfficeRuntime.storage.getItem("user");
    const userData = JSON.parse(userDataStr);

    const body = JSON.stringify({
      file_name: file_name,
      user_id: userData.id,
    });

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });

    if (!response.ok) {
      // Handle unauthorized or forbidden response
      if (response.status === 401 || response.status === 403) {
        return { success: false, error: "Login to continue" };
      }

      // Handle other errors
      const errJson = await response.json();
      console.log(errJson);
      // console.error(`Error Response: ${errorText}`);
      return { success: false, error: errJson.detail };
    }

    const resp = await response.json();
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = {
  allPdfTablesApi,
};
