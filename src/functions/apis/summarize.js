const { BASE_URL } = require("../utils");
const { sanitizeInput } = require("../utils/formula");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function summarizeApi(input) {
  try {
    let url = `${BASE_URL}/summarize/`;

    const token = await getItem("accessToken");
    console.log(token);

    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }

    const sanitized_input = sanitizeInput(input);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ input: sanitized_input }),
    });
    const resp = await res.json();
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = { summarizeApi };
