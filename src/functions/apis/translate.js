const { BASE_URL } = require("../utils");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function translateApi(input, language) {
  try {
    let url = `${BASE_URL}/translate/`;

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
      body: JSON.stringify({ input, language }),
    });
    const resp = await res.json();
    return { success: true, data: resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
}

module.exports = { translateApi };
