import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Spinner } from "@fluentui/react-components";
import { config } from "../../env";

const Logout = () => {
  const { logout } = useAuth0();
  useEffect(() => {
    setTimeout(() => {
      logout({ logoutParams: { returnTo: `${config.websiteDomain}/#/logout` } });
    }, 2000);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  );
};

export default Logout;
