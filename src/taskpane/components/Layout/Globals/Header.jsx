import * as React from "react";
import {
  Hamburger,
  NavDivider,
  NavDrawer,
  NavDrawerBody,
  NavDrawerHeader,
  NavItem,
  NavSectionHeader,
} from "@fluentui/react-nav-preview";
import { Image, mergeClasses } from "@fluentui/react-components";
import { Tooltip } from "@fluentui/react-components";
import { useLocation } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";
import { useHeaderstyles } from "../../../hooks/styles/useHeaderstyles";
import { openLoginDialog, openLogoutDialog } from "../../../utils/Events/Dialogevents";
import { useAuthContext, useAuthDispatch } from "../../../context/Authcontext/selectors";
import { getPathName } from "../../../utils/Helpers";
import { openExternalBrowser } from "../../../utils/Events/BrowserEvents";
import { Colors } from "../../../utils/constants";
import AccountMenu from "./AccountMenu";
import Documenticon from "../../icons/documentation";
import Uploadicon from "../../icons/upload";
import Pricing from "../../icons/pricing";
import Lock from "../../icons/lock";
import Settings from "../../icons/settings";

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();
  console.log(location.pathname);
  const styles = useHeaderstyles();
  const userState = useAuthContext();
  const navigate = useNavigate();
  const globalStyles = useGlobalstyles();
  const dispatch = useAuthDispatch();

  const isLoggedIn = userState?.token && userState?.user;

  const logoutFunc = (e) => {
    e.stopPropagation();
    console.log("clicked");
    return openLogoutDialog(dispatch);
  };

  const getHeaderNode = (globalStyles, path, isDrawer) => {
    console.log(path);
    if (path === "/functions" || path === "/" || isDrawer) {
      return (
        <>
          <Image width={16} height={16} src="/assets/mindcase logo - dark.svg" />
          <p
            className={mergeClasses(
              globalStyles.marginTopZero,
              globalStyles.marginBottomZero,
              globalStyles.montserrat,
              styles.headerText1
            )}
          >
            mind
            <span
              style={{
                "--font-selector": "RlM7TWFucm9wZS1saWdodA==",
                fontWeight: "300",
              }}
              className={globalStyles.montserrat}
            >
              case
            </span>
          </p>
        </>
      );
    }

    return (
      <p
        className={mergeClasses(
          globalStyles.marginTopZero,
          globalStyles.marginBottomZero,
          globalStyles.montserrat,
          styles.headerPathName
        )}
      >
        {getPathName(path)}
      </p>
    );
  };

  const renderHamburgerWithToolTip = (isDrawer) => {
    return (
      <div id="tet" className={mergeClasses(styles.headerContainer, isDrawer && globalStyles.paddingTopLarge)}>
        <Tooltip content="Navigation" relationship="label">
          <Hamburger
            className={mergeClasses(styles.tooltip, isDrawer && styles.drawerTooltip)}
            onClick={() => setIsOpen(!isOpen)}
          />
        </Tooltip>
        <div className={styles.logoContainer}>{getHeaderNode(globalStyles, location.pathname, isDrawer)}</div>
      </div>
    );
  };

  const renderHeaderBottomMenu = () => {
    return <AccountMenu logout={logoutFunc} userState={userState} styles={styles} />;
  };

  return (
    <>
      <NavDrawerHeader style={{ padding: "0px" }}>{renderHamburgerWithToolTip(false)}</NavDrawerHeader>

      <NavDrawer className={styles.drawer} defaultSelectedValue="1" defaultSelectedCategoryValue="" open={isOpen}>
        <NavDrawerHeader style={{ padding: "0px" }}>{renderHamburgerWithToolTip(true)}</NavDrawerHeader>
        <NavDrawerBody style={{ color: "white" }} className={styles.navBody}>
          <div className={styles.navItemsParent}>
            <div>
              {renderHeaderBottomMenu()}
              <NavDivider className={styles.navDivider} />
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div>
                  <NavSectionHeader className={mergeClasses(styles.sectionHeader, globalStyles.h4)}>
                    Home
                  </NavSectionHeader>

                  <NavItem
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/");
                    }}
                    className={mergeClasses(
                      styles.navItemContainer,
                      location.pathname === "/" ? styles.currentPath : ""
                    )}
                    icon={<Documenticon color={location.pathname === "/" ? Colors.accent : "#CDD1DC"} />}
                    value="1"
                  >
                    Documentation
                  </NavItem>
                  <NavItem
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/upload-document");
                    }}
                    className={mergeClasses(
                      styles.navItemContainer,
                      location.pathname === "/upload-document" ? styles.currentPath : ""
                    )}
                    icon={<Uploadicon color={location.pathname === "/upload-document" ? Colors.accent : "#CDD1DC"} />}
                    value="10"
                  >
                    Upload Documents
                    <div className={styles.planPill}>
                      {" "}
                      <span>PRO </span>
                    </div>
                  </NavItem>
                </div>
                <div>
                  <NavSectionHeader className={mergeClasses(styles.sectionHeader, globalStyles.h4)}>
                    Account
                  </NavSectionHeader>

                  <NavItem
                    className={mergeClasses(
                      styles.navItemContainer,
                      location.pathname === "/pricing" ? styles.currentPath : ""
                    )}
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/pricing");
                    }}
                    icon={<Pricing color={location.pathname === "/pricing" ? Colors.accent : "#CDD1DC"} />}
                    value="3"
                  >
                    Plans
                  </NavItem>
                  <NavItem
                    className={mergeClasses(
                      styles.navItemContainer,
                      location.pathname === "/settings" ? styles.currentPath : ""
                    )}
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/settings");
                    }}
                    icon={<Settings color={location.pathname === "/settings" ? Colors.accent : "#CDD1DC"} />}
                    value="9"
                  >
                    Settings
                  </NavItem>
                </div>
                <div>
                  <NavSectionHeader className={mergeClasses(styles.sectionHeader, globalStyles.h4)}>
                    Support
                  </NavSectionHeader>

                  <NavItem
                    className={mergeClasses(
                      styles.navItemContainer,
                      location.pathname === "/privacy-policy" ? styles.currentPath : ""
                    )}
                    onClick={() => {
                      openExternalBrowser("https://www.mindcase.co/privacy-policy");
                      setIsOpen(false);
                    }}
                    icon={<Lock color={location.pathname === "/privacy-policy" ? Colors.accent : "#CDD1DC"} />}
                    value="6"
                  >
                    Privacy Policy
                    <Image src="../../../../../assets/link-ext.svg" className={styles.linkExt} />
                  </NavItem>
                  <NavItem
                    className={mergeClasses(
                      styles.navItemContainer,
                      location.pathname === "/terms" ? styles.currentPath : ""
                    )}
                    onClick={() => {
                      openExternalBrowser("https://www.mindcase.co/terms");
                      setIsOpen(false);
                    }}
                    icon={<Lock color={location.pathname === "/terms" ? Colors.accent : "#CDD1DC"} />}
                    value="7"
                  >
                    Terms and Conditions
                    <Image src="../../../../../assets/link-ext.svg" className={styles.linkExt} />
                  </NavItem>
                </div>
              </div>
            </div>
            {isLoggedIn ? (
              <div onClick={(e) => logoutFunc(e)} className={styles.loginAppItem}>
                <Image src="../../../../../assets/logout.svg" alt="logout" />
                Logout
              </div>
            ) : (
              <div onClick={() => openLoginDialog(dispatch)} className={styles.loginAppItem}>
                <Image src="../../../../../assets/login.svg" alt="logout" />
                Login
              </div>
            )}
          </div>
        </NavDrawerBody>
      </NavDrawer>
      <Outlet />
    </>
  );
};

export default Header;
