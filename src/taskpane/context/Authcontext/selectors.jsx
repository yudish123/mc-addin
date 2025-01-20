import { useContext } from "react";
import { AuthContext } from "./index";
import { config } from "../../../env";

export const useAuthContext = () => {
  const { state, refreshState } = useContext(AuthContext);
  if (!state) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return { ...state, refreshState };
};

export const useAuthDispatch = () => {
  const { dispatch } = useContext(AuthContext);
  if (!dispatch) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return dispatch;
};

export const getOrgidApi = async (token, userid) => {
  const url = `https://${config.auth0domain}/api/v2/users/${userid}/organizations`;
  const headers = { authorization: `Bearer ${token}` };
  const resp = await fetch(url, { headers });
  const data = await resp.json();
  console.log(data);
  return data.org_id;
};

export const getAccessTokenApi = async () => {
  const resp = await fetch(`${config.apiDomain}/auth/token`);
  const data = await resp.json();
  return data.access_token;
};

export const validateTokenApi = async (accessToken) => {
  const resp = await fetch(`${config.apiDomain}/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const res = await resp.json();
  console.log(res, 46);
  if (resp.status === 200) {
    return { success: true, data: res.user_data };
  }
  return { success: false, error: res.detail };
};
