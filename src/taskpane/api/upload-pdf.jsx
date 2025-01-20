import { config } from "../../env.js";

export const uploadPdf = async (file, userid, token) => {
  try {
    const formdata = new FormData();
    formdata.append("file", file);
    formdata.append("user_id", userid);

    const res = await fetch(`${config.BASE_URL}/upload-pdf/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return { data, success: true };
  } catch (error) {
    console.error("Error uploading PDF:", error);
    return { success: false };
  }
};

export const deleteFileApi = async (fileName, fileid, userid, token) => {
  try {
    const res = await fetch(
      `${config.BASE_URL}/delete/file/?file_name=${fileName}&file_id=${fileid}&user_id=${userid}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();
    return { data, success: true };
  } catch (error) {
    console.error("Error deleting PDF:", error);
    return { success: false };
  }
};

export const downloadFileApi = async (fileid, filetype) => {
  try {
    const response = await fetch(`${config.BASE_URL}/download/file/?file_id=${fileid}&file_type=${filetype}`);

    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;

    link.setAttribute("download", `${fileid}.${filetype}`);

    document.body.appendChild(link);
    link.click();

    // Clean up the link and revoke the object URL
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading the file:", error);
    alert("Failed to download the file. Please try again.");
  }
};

export const delete_folder = async (folder_id, token) => {
  try {
    const response = await fetch(`${config.BASE_URL}/delete/folder/?folder_id=${folder_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return { success: true };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const getFilesandFoldersApi = async (userid, token) => {
  try {
    const response = await fetch(`${config.BASE_URL}/get/files_folders/?user_id=${userid}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 401 || response.status === 403) {
      return { success: false, auth: true, error: "Please login again" };
    }

    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.statusText}`);
    }
    const data = await response.json();
    return { data, success: true };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const createFolderApi = async (folder_name, user_id, token) => {
  try {
    const response = await fetch(`${config.BASE_URL}/create/folder/`, {
      method: "POST",
      body: JSON.stringify({
        folder_name: folder_name,
        user_id: user_id,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch files: ${response.statusText}`);
    }
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const moveFileInOut = async (folder_id, file_id, folder_name, token) => {
  try {
    const response = await fetch(
      `${config.BASE_URL}/add_file/folder/?folder_id=${folder_id}&file_id=${file_id}&folder_name=${folder_name}`,
      {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    if (data.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
