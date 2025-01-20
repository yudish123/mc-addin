import React from "react";
import ArrowLeft from "../../icons/ArrowLeft";
import { useNavigate } from "react-router-dom";
import { Text } from "@fluentui/react-components";
import { useHeaderstyles } from "../../../hooks/styles/useHeaderstyles";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";

const PageHeader = ({ pageName }) => {
  const styles = useHeaderstyles();
  const globalStyles = useGlobalstyles();
  const navigate = useNavigate();
  const goback = () => navigate(-1);

  return (
    <div className={styles.subHeaderContainer}>
      <div className={styles.subheaderTooltip} onClick={goback}>
        <ArrowLeft />
      </div>
      <div className={styles.logoContainer}>
        <Text style={{ fontSize: "18px" }} className={globalStyles.h4}>
          {pageName}
        </Text>
      </div>
    </div>
  );
};

export default PageHeader;
