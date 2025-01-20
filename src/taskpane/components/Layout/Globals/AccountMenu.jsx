import { Image, mergeClasses } from "@fluentui/react-components";
import React from "react";
import { config } from "../../../config/";
import { Dimensions } from "../../../utils/constants";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";

const AccountMenu = ({ userState, styles }) => {
  const plan = config.planMap[userState?.user?.plan_type]?.read_name?.split(" ")[0];
  const globalStyles = useGlobalstyles();
  return (
    <div style={{ color: "white", backgroundColor: "rgba(30,42,56,0.8)" }} className={styles.appItem}>
      <div
        style={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          gap: "6px",
          paddingInline: "12px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src="../../../../../assets/person-circle.svg" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              width: "160px",
            }}
            className={mergeClasses(globalStyles.h3)}
          >
            {userState?.user?.email ?? "User"}
          </span>
          {plan ? (
            <span
              style={{
                lineHeight: "15px",
                textTransform: "uppercase",
                fontSize: Dimensions.fonts.extraSmall,
                opacity: "0.8",
              }}
              className={mergeClasses(globalStyles.h4, globalStyles.colorMuted)}
            >
              {plan} PLAN
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
