// src/components/App.jsx
import { Button } from "@fluentui/react-components";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";

const App = ({ title }) => {
  const navigate = useNavigate();
  const globalStyles = useGlobalstyles();
  return (
    <div
      className={globalStyles.container}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}
    >
      <h2>{title}</h2>
      <Button onClick={() => navigate("/functions")}>View Docs</Button>
    </div>
  );
};

export default App;
