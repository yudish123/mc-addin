const { BASE_URL } = require("../utils");
const { sanitizeInput } = require("../utils/formula");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function extractApi(query, source_url, output_format, enable_pagination, no_of_pages) {
  try {
    const url = `${BASE_URL}/extract/`;
    const sanitizeQuery = sanitizeInput(query);

    const token = await getItem("accessToken");
    console.log(token);

    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }
    // Prepare the request body as a JSON object
    const body = {
      query: sanitizeQuery,
      source: source_url,
      output_format: output_format || undefined, // Only include if it's provided
      paging: enable_pagination || undefined, // Only include if it's true
      pages: no_of_pages || undefined, // Only include if it's provided
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
    console.log(resp);
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = {
  extractApi,
};
