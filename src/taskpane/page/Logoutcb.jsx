import { Spinner, Text } from "@fluentui/react-components";
import React, { useEffect } from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";

const Logoutcb = () => {
  const globalStyles = useGlobalstyles();
  useEffect(() => {
    setTimeout(() => {
      Office.context.ui.messageParent(JSON.stringify({ action: "SUCCESS" }));
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

export default Logoutcb;
