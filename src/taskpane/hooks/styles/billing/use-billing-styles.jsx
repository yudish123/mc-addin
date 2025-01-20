import { Dimensions } from "../../../utils/constants";

const { makeStyles, shorthands } = require("@fluentui/react-components");

const useStyles = makeStyles({
  card: {
    marginTop: Dimensions.spacing.small,
    display: "flex",
    flexDirection: "column",
    background: "#F7FAFD",
    boxShadow: "none",
    ...shorthands.border("1px", "solid", "#F3F3F4"),
    gap: Dimensions.spacing.medium,
    padding: Dimensions.spacing.large,
    borderRadius: "15px",
  },
  cardLabel: {
    fontSize: "12px",
    fontWeight: "500",
    color: "#344054",
  },
  billingInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
});

export const useBillingStyles = () => useStyles();
