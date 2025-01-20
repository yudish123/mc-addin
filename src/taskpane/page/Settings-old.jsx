import React from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import { useSettingsStyles } from "../hooks/styles/settings/usePagestyles";
import { Card, Image, mergeClasses, Text, Switch } from "@fluentui/react-components";
import { ChevronRight16Regular } from "@fluentui/react-icons";
import { AccountCardItems, GeneralCardItems, loginCardItem, logoutCardItem } from "../utils/strings/card-item";
import CacheSwitch from "../components/Settings/CacheSwitch";
import { useAuthContext, useAuthDispatch } from "../context/Authcontext/selectors";
import { Dimensions } from "../utils/constants";
import { openLoginDialog, openLogoutDialog } from "../utils/Events/Dialogevents";

const CardItemComp = ({ icon, text, ischevron, onClick }) => {
  const pageStyles = useSettingsStyles();
  const globalStyles = useGlobalstyles();

  return (
    <>
      <div style={onClick ? { cursor: "pointer" } : {}} onClick={onClick} className={pageStyles.accountCardItem}>
        <div className={pageStyles.accountCardTextBox}>
          {text !== "Enable Cache" ? (
            <>
              {icon}
              <Text style={{ fontWeight: "600" }} className={mergeClasses(globalStyles.marginTopZero)}>
                {text}
              </Text>
            </>
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Text style={{ fontWeight: "600" }} className={mergeClasses(globalStyles.marginTopZero)}>
                {text} <span style={{ fontSize: "12px", fontWeight: "700", color: "gray" }}> (Recommended)</span>
              </Text>
            </div>
          )}
        </div>
        {ischevron ? <ChevronRight16Regular /> : text === "Enable Cache" ? <CacheSwitch /> : <Switch />}
      </div>
      {text === "Enable Cache" ? (
        <Text style={{ fontWeight: "600", color: "gray" }} className={globalStyles.h5}>
          If you disable cache, the entire sheet may reload at times, potentially incurring additional credits.
        </Text>
      ) : null}
    </>
  );
};

const CardComp = ({ cardlabel, items, onClick }) => {
  const globalStyles = useGlobalstyles();
  const pageStyles = useSettingsStyles();

  return (
    <>
      <h2 className={mergeClasses(pageStyles.cardHeading, globalStyles.marginBottomZero)}>{cardlabel}</h2>
      <Card className={pageStyles.cardContainer}>
        {items.map((item, index) => (
          <CardItemComp onClick={onClick} key={index} icon={item.icon} text={item.text} ischevron={item.isChevron} />
        ))}
      </Card>
    </>
  );
};

const Settings = () => {
  const globalStyles = useGlobalstyles();
  const pageStyles = useSettingsStyles();

  const userstate = useAuthContext();
  console.log(userstate);

  const dispatch = useAuthDispatch();

  const loginFunc = () => openLoginDialog(dispatch);
  const logoutFunc = () => openLogoutDialog(dispatch);

  const othercardItemFunc = userstate.user && userstate.token ? logoutFunc : loginFunc;

  const cardItem = userstate.user && userstate.token ? [logoutCardItem] : [loginCardItem];

  return (
    <div className={globalStyles.container}>
      {/* Profile Section */}
      {userstate?.user || userstate.token ? (
        <div className={pageStyles.imageContianer}>
          <Image src={"../../../assets/pane-logo.png"} width={60} className={pageStyles.mainImage} height={60} />
          <div className={pageStyles.accountInfoContainer}>
            <Text className={pageStyles.accountInfoHeader}>{userstate.user.name}</Text>
            <Text className={pageStyles.accountInfoSubheader}>{userstate.user.email}</Text>
          </div>
        </div>
      ) : (
        <Text style={{ fontSize: Dimensions.fonts.medium, fontWeight: "600" }}>
          {" "}
          Please login to view your account info{" "}
        </Text>
      )}

      {/* Cards Section */}
      <CardComp cardlabel="Account Settings" items={AccountCardItems} />
      <CardComp cardlabel="General Settings" items={GeneralCardItems} />
      <CardComp onClick={othercardItemFunc} cardlabel="Others" items={cardItem} />
    </div>
  );
};

export default Settings;
