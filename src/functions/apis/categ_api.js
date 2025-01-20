const { BASE_URL } = require("../utils");
const { sanitizeInput } = require("../utils/formula");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function categ_api(input, topic) {
  try {
    const url = `${BASE_URL}/categ/`;
    const sanitized_input = sanitizeInput(input);
    const sanitized_categories = sanitizeInput(topic);

    const token = await getItem("accessToken");
    console.log(token);
    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }
    // Create the request body as JSON
    const body = JSON.stringify({
      input: sanitized_input,
      categories: sanitized_categories,
    });

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
  categ_api,
};
