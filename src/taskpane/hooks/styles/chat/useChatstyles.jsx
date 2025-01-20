import { makeStyles, shorthands } from "@fluentui/react-components";
import { Dimensions, Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  pageContainer: {
    position: "relative",
    background: Colors.background,
    height: "92.5vh",
  },
  chatInput: {
    position: "absolute",
    bottom: "10px",
    margin: "0 auto",
    left: "5%",
    width: "90%",
    ...shorthands.border("1px", "ridge", "gray"),
    paddingBlock: Dimensions.spacing.medium,
    borderRadius: "16px",
    border: "1px",
    zIndex: "100",
  },
  sendBtn: {
    cursor: "pointer",
    color: Colors.primary,
  },
  sendBtnDisabled: {
    cursor: "not-allowed",
    color: Colors.grayText,
  },
});

export const useChatstyles = () => {
  return useStyles();
};
