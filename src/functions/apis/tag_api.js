const { BASE_URL } = require("../utils");
const { sanitizeInput } = require("../utils/formula");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function tag_api(input, tags) {
  try {
    const url = `${BASE_URL}/tag_api/`;
    const sanitized_input = sanitizeInput(input);
    const sanitized_tags = sanitizeInput(tags);

    const token = await getItem("accessToken");
    console.log(token);

    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }

    // Prepare the request body as a JSON object
    const body = {
      input: sanitized_input,
      tags: sanitized_tags,
    };

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
  tag_api,
};
