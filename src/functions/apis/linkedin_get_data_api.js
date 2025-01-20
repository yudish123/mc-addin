const { BASE_URL } = require("../utils");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function linkedinGetDataApi(URL, datapoint) {
  try {
    const url = `${BASE_URL}/get_linkedin_data/`;
    // Create the request body as JSON
    const body = JSON.stringify({
      url: URL,
      query: datapoint,
    });

    const token = await getItem("accessToken");
    console.log(token);
    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }

    // Send a POST request with JSON body
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: body,
    });

    const resp = await res.json();
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = {
  linkedinGetDataApi,
};
