import React, { useEffect } from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import { useAuth0 } from "@auth0/auth0-react";
// import { getOrgidApi } from "../context/Authcontext/selectors";
import { Spinner } from "@fluentui/react-components";
import { config } from "../../env";
import { validateTokenApi } from "../context/Authcontext/selectors";

const Functions = () => {
  const globalStyles = useGlobalstyles();
  const { isAuthenticated, getAccessTokenSilently, isLoading, logout } = useAuth0();
  console.log(isAuthenticated, isLoading);
  const closeLoginDialog = async () => {
    try {
      const managementToken = await getAccessTokenSilently({
        authorizationParams: {
          audience: `https://${config.auth0domain}/api/v2/`,
          scope: "read:current_user",
        },
      });

      // const userDetailsByIdUrl = `https://${config.auth0domain}/api/v2/users/${user.sub}`;

      // const metadataResponse = await fetch(userDetailsByIdUrl, {
      //   headers: {
      //     Authorization: `Bearer ${managementToken}`,
      //   },
      // });

      // const userData = await metadataResponse.json();
      const userData = await validateTokenApi(managementToken);
      if (!userData.success) {
        return;
      }
      // const accessToken = await getAccessTokenApi();
      // const org_id = await getOrgidApi(managementToken, user.sub);
      // console.log(org_id);
      //   console.log(org_id);

      if (!userData.success) {
        Office.context.ui.messageParent(JSON.stringify({ action: "FAILURE", error: userData.error }));
      }

      Office.context.ui.messageParent(
        JSON.stringify({ action: "SUCCESS", user: userData.data, accessToken: managementToken })
      );
    } catch (e) {
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      console.log("Starting timeout...");
      const timer = setInterval(() => {
        console.log("Timeout executed");
        closeLoginDialog();
      }, 1000);

      return () => {
        console.log("Clearing timeout...");
        clearInterval(timer);
      };
    }
    if (!isAuthenticated && !isLoading) {
      console.log("Not logged in");
      logout({ returnTo: `${window.location.origin}/#/logoutinit` });
    }
  }, [isAuthenticated, isLoading]);

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

export default Functions;
