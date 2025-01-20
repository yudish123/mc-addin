const { BASE_URL } = require("../utils");
const { getItem } = require("../../taskpane/utils/Helpers/officeStorage");

async function askFolderApi(query, folder_name, output_format) {
  try {
    const url = `${BASE_URL}/ask_folder/`;
    const token = await getItem("accessToken");
    console.log(token);

    if (!token) {
      throw new Error("#ERROR: Please login to continue");
    }

    const userDataStr = await OfficeRuntime.storage.getItem("user");
    const userData = JSON.parse(userDataStr);

    const body = JSON.stringify({
      query: query,
      folder_name: folder_name,
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
  askFolderApi,
};
