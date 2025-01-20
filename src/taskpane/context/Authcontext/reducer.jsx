import { getItem, removeItem, setItem } from "../../utils/Helpers/localstorage";

export const initialAuthState = {
  token: getItem("accessToken"),
  user: getItem("user"),
  loading: false,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_LOADING":
      return { ...state, loading: true };
    case "UPDATE_USER":
      setItem("user", action.payload);
      return { ...state, user: action.payload };
    case "LOGIN":
      console.log(action.payload, 14);
      setItem("user", action.payload.user);
      setItem("accessToken", action.payload.accessToken);
      return { ...state, token: action.payload.accessToken, user: action.payload.user, loading: false };
    case "LOGOUT":
      removeItem("user");
      removeItem("accessToken");
      if (typeof OfficeRuntime !== "undefined" && OfficeRuntime?.storage) {
        OfficeRuntime.storage.removeItem("user");
        OfficeRuntime.storage.removeItem("accessToken");
      }
      return { ...state, token: null, user: null, loading: false };
    default:
      return state;
  }
};
