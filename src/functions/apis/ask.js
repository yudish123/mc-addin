const { BASE_URL } = require("../utils");
const { sanitizeInput } = require("../utils/formula");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function askApi(query, input, output_format, enable_web_search) {
  try {
    let url = `${BASE_URL}/ask/`;
    const sanitizedQuery = sanitizeInput(query);
    const sanitizedInput = sanitizeInput(input);
    // if (input) url = `${url}&input=${input}`;
    // if (output_format) url = `${url}&output_format=${output_format}`;
    // if (enable_web_search) url = `${url}&web_search=${enable_web_search}`;

    const token = await getItem("accessToken");
    console.log(token);

    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }

    const res = await fetch(url, {
      method: "POST",
      timeout: 10000,
      headers: {
        "Content-Type": "application/json", // Ensure the request is sent as JSON
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: sanitizedQuery,
        input: sanitizedInput,
        output_format: output_format ?? 0,
        web_search: enable_web_search ?? 0,
      }),
    });

    console.log(res);

    if (res.status === 403 || res.status === 401) {
      throw new Error("#ERROR: Please login to continue");
    }

    const resp = await res.json();
    console.log(resp);
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = {
  askApi,
};
