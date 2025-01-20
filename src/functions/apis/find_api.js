const { BASE_URL } = require("../utils");
const { sanitizeInput } = require("../utils/formula");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function find_api(input, topic) {
  try {
    const url = `${BASE_URL}/find_api/`;
    const sanitized_input = sanitizeInput(input);
    const sanitized_topic = sanitizeInput(topic);
    // Prepare the request body as a JSON object
    const body = {
      input: sanitized_input,
      topic: sanitized_topic,
    };

    const token = await getItem("accessToken");

    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }

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
  find_api,
};
