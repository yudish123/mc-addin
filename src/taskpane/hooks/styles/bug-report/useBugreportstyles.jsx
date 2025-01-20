// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { makeStyles } from "@fluentui/react-components";
import { Dimensions, Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  headerText: {
    fontSize: Dimensions.fonts.extraLarge,
    fontWeight: "500",
  },
});

export const useBugreportStyles = () => {
  return useStyles();
};
