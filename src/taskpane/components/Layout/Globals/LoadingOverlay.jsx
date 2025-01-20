import { Image } from "@fluentui/react-components";
import React from "react";

const LoadingOverlay = () => {
  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(250, 254, 255, 0.4)", // Semi-transparent background
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999, // Ensure it appears above all other content
  };

  return (
    <div style={overlayStyle}>
      <Image
        src="../../../../../assets/spinner.gif"
        alt="Loading..."
        width={100} // Adjust size as needed
        height={100}
      />
    </div>
  );
};

export default LoadingOverlay;
