// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { makeStyles } from "@fluentui/react-components";
import { Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  annualTab: {
    borderRadius: "300px",
    paddingBlock: "0px!important",
    paddingInline: "12px",
    maxHeight: "60px",
    "> span": {
      fontWeight: "500!important",
      fontSize: "12px",
    },
  },
  tabSelectedColor: {
    ":hover": {
      backgroundColor: `${Colors.accent} !important`,
    },
    borderRadius: "300px",
    color: `#ffffff !important`,
    backgroundColor: Colors.accent,
  },
  tabNotSelectedColor: {
    color: "#98A2B3",

    backgroundColor: "transparent",
  },
  monthlyTab: {
    paddingBlock: "0px!important",
    paddingInline: "12px",
    "> span": {
      fontWeight: "500!important",
      fontSize: "12px",
    },
    borderRadius: "300px",
  },
});

export const usePricingTabs = () => {
  return useStyles();
};
