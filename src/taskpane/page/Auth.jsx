import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Auth = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  console.log(isAuthenticated);
  useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect();
    }
  }, []);

  return <></>;
};

export default Auth;
