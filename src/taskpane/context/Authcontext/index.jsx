import React, { createContext, useEffect, useReducer } from "react";
import { authReducer, initialAuthState } from "./reducer";
import { getItem } from "../../utils/Helpers/localstorage";
import { validateTokenApi } from "./selectors";
import { useToast } from "../../hooks/useToast";
import { Toaster } from "@fluentui/react-components";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);
  const { failureToast, toasterId } = useToast();

  const handleAuthState = async (accessToken, user) => {
    try {
      const validate = await validateTokenApi(accessToken);
      console.log(accessToken, 14);

      if (validate.success && user) {
        dispatch({ type: "LOGIN", payload: { user: validate.data, accessToken } });
      } else {
        dispatch({ type: "LOGOUT" });
        failureToast("Please login again");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const accessToken = getItem("accessToken");
    const user = getItem("user");
    if (accessToken) handleAuthState(accessToken, user);
    if (!accessToken) return;
  }, []);

  const refreshState = () => {
    console.log("refreshing");
    const accessToken = getItem("accessToken");
    const user = getItem("user");
    handleAuthState(accessToken, user);
  };

  return (
    <AuthContext.Provider value={{ state, dispatch, refreshState }}>
      <Toaster toasterId={toasterId} />
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
