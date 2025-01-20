// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { makeStyles } from "@fluentui/react-components";
import { Dimensions, Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  accountNameContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Dimensions.spacing.small,
  },
  formContainer: {
    display: "flex",
    marginTop: Dimensions.spacing.extraLarge,
    width: "100%",
    flexDirection: "column",
    gap: Dimensions.spacing.small,
  },
});

export const useBillingFormStyles = () => {
  return useStyles();
};
