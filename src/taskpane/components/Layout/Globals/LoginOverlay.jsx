import React from "react";

const LoginOverlay = ({ children }) => {
  const overlayStyle = {
    //filter blur background
    backdropFilter: "blur(6px)",
    position: "fixed",
    top: 45,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(250, 254, 255, 0.3)", // Semi-transparent background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999, // Ensure it appears above all other content
  };
  return <div style={overlayStyle}>{children}</div>;
};

export default LoginOverlay;
