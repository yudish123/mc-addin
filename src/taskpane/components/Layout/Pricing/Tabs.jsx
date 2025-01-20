import * as React from "react";
import { mergeClasses, Tab, TabList } from "@fluentui/react-components";
import { usePricingTabs } from "../../../hooks/styles/pricing/usePricingTabs";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";

const PriceTabs = ({ selectedValue, onTabSelect }) => {
  const tabStyles = usePricingTabs();
  const globalStyles = useGlobalstyles();

  return (
    <TabList
      selectedValue={selectedValue}
      onTabSelect={onTabSelect}
      style={{ gap: "0px", background: "#F2F4F7", borderRadius: "300px", miinWidth: "220px", paddingBlock: "2px" }}
      appearance="filled-circular"
    >
      <Tab
        id="monthly-tab"
        className={mergeClasses(
          tabStyles.monthlyTab,
          selectedValue === "monthly" ? tabStyles.tabSelectedColor : tabStyles.tabNotSelectedColor
        )}
        value="monthly"
      >
        Monthly
      </Tab>
      <Tab
        id="annual-tab"
        className={mergeClasses(
          tabStyles.annualTab,
          selectedValue === "annually" ? tabStyles.tabSelectedColor : tabStyles.tabNotSelectedColor
        )}
        value={"annually"}
      >
        <span className={mergeClasses(globalStyles.marginTopZero, globalStyles.marginBottomZero)}> Annually</span>
      </Tab>
    </TabList>
  );
};

export default PriceTabs;
