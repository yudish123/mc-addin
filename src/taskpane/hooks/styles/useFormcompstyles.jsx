import { makeStyles, shorthands } from "@fluentui/react-components";
import { Colors, Dimensions } from "../../utils/constants";

const useStyles = makeStyles({
  formRowContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    gap: Dimensions.spacing.extraSmall,
    marginBottom: Dimensions.spacing.small,
  },
  input: {
    padding: Dimensions.spacing.small,
    borderRadius: Dimensions.spacing.small,
    border: "none",
    outline: "none",
    ...shorthands.border("1px", "ridge", Colors.grayText),
  },
  select: {
    borderRadius: Dimensions.spacing.small,
    border: "none",
    backgroundColor: "white",
    paddingBlock: Dimensions.spacing.extraSmall,
    outline: "none",
    ...shorthands.border("1px", "ridge", Colors.grayText),
    "> select": {
      border: "none",
      height: "100%",
      outline: "none",
      borderRadius: Dimensions.spacing.small,
    },
  },
  disabledInput: {
    ...shorthands.border("1px", "ridge", Colors.grayText),
    backgroundColor: Colors.grayText,
    cursor: "not-allowed",
  },
});

export const useFormcompStyles = () => {
  return useStyles();
};
