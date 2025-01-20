const { BASE_URL } = require("../utils");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function standardizeUnitsApi(input, target_notation) {
  try {
    const url = `${BASE_URL}/standardizeUnits/`;

    // Prepare the request body as a JSON object
    const body = {
      input_number: input,
      output_format: target_notation,
    };

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
      body: JSON.stringify(body),
    });
    const resp = await res.json();
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = {
  standardizeUnitsApi,
};
