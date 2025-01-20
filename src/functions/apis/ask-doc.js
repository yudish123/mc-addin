const { BASE_URL } = require("../utils");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function askDocumentApi(query, file_name, output_format) {
  try {
    const url = `${BASE_URL}/ask_pdf/`;

    const userDataStr = await OfficeRuntime.storage.getItem("user");
    const userData = JSON.parse(userDataStr);
    const token = await getItem("accessToken");
    console.log(token);


    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }

    const body = JSON.stringify({
      query: query,
      file_name: file_name,
      output_format: output_format ?? 0,
      user_id: userData.id,
    });

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
  askDocumentApi,
};
