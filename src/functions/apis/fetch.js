const { BASE_URL } = require("../utils");
const { sanitizeInput } = require("../utils/formula");

async function fetchApi(company_name, datapoint, source, custom_instruction) {
  const url = `${BASE_URL}/fetchweb/`;
  const sanitized_custom_instruction = sanitizeInput(custom_instruction);

  const at = await OfficeRuntime.storage.getItem("accessToken");
  const token = JSON.parse(at);

  if (!token) {
    return { success: false, error: "#Error: Login to continue" };
  }

  const body = {
    query: datapoint,
    company: company_name,
    sources: source || undefined,
    comments: sanitized_custom_instruction || undefined,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
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

    // Parse and return successful response
    const resp = await response.json();
    return { success: true, data: resp };
  } catch (error) {
    console.error(`Fetch API Error: ${error}`);
    return { success: false, error: "Something went wrong" };
  }
}

module.exports = {
  fetchApi,
};
