import { makeStyles, shorthands } from "@fluentui/react-components";
import { Colors, Dimensions } from "../../../utils/constants";

const useStyles = makeStyles({
  formulaBoxCotnainer: {
    display: "flex",
    flexDirection: "column",
    gap: Dimensions.spacing.large,
  },
  formulaBox: {
    display: "flex",
    flexDirection: "column",
    borderRadius: Dimensions.spacing.medium,
    ...shorthands.border("1px", "solid", "#D5F4E5"),
    backgroundColor: Colors.grayText,
  },
  boxHeader: {
    backgroundColor: Colors.accent,
    display: "flex",
    gap: Dimensions.spacing.medium,
    alignItems: "center",
    color: "white",
    paddingInline: Dimensions.spacing.medium,
    paddingBlock: "2px",
    borderTopLeftRadius: Dimensions.spacing.medium,
    borderTopRightRadius: Dimensions.spacing.medium,
  },
  accordionContainer: {
    backgroundColor: "white",
    paddingBottom: Dimensions.spacing.medium,
  },
});

export const useFormulaStyles = () => useStyles();
