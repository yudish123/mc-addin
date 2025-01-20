const { BASE_URL } = require("../utils");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function yahooFinanceApi(company_name, datapoint, output_format, units) {
  try {
    let url = `${BASE_URL}/ask_yf/`;

    const token = await getItem("accessToken");
    console.log(token);
    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        company: company_name,
        query: datapoint,
        number_format: units ?? "",
        output_format: output_format ?? 0,
      }),
    });

    if (res.status === 403 || res.status === 401) {
      throw new Error("#ERROR: Please login to continue");
    }

    const resp = await res.json();
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = { yahooFinanceApi };
