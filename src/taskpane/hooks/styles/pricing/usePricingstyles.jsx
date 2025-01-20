// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { makeStyles, shorthands } from "@fluentui/react-components";
import { Dimensions, Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  pageContainer: {
    padding: Dimensions.spacing.large,
    background: "#ffffff",
  },
  plansContainer: {
    marginTop: Dimensions.spacing.medium,
    display: "flex",
    flexDirection: "column",
    gap: Dimensions.spacing.large,
  },
  currencyDropdownContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Dimensions.spacing.large,
  },
  currencyDropdown: {
    width: "25%",
    "> span": {
      paddingBlock: "3px",

      ...shorthands.border("1px", "solid", Colors.accent),
    },
    "> span > select": {
      fontSize: "13px",
      paddingRight: "24px",
      fontWeight: "500",
      color: Colors.accent,
    },
    "> span > span": {
      color: Colors.accent,
      right: "8px",
      fontWeight: "500",
    },
    paddingBlock: "0px",
  },
});

export const usePricingstyles = () => {
  return useStyles();
};
