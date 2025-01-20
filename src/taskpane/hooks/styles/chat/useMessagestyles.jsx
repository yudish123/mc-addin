import { makeStyles, shorthands } from "@fluentui/react-components";
import { Dimensions, Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  messagesContainer: {
    height: "78%",
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
    gap: "10px",
  },
  message: {
    maxWidth: "70%",
    padding: "10px 15px",
    borderRadius: "15px",
    wordWrap: "break-word",
  },
  assistantMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    color: `#000000 !important`,
    fontSize: Dimensions.fonts.medium,
    fontWeight: "600",
    outline: "none",
    ...shorthands.border("1px", "ridge", Colors.grayText),
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.primary,
    fontSize: "13px",
    fontWeight: "600",
    color: "white",
  },
  noMessages: {
    textAlign: "center",
    color: "#888",
    fontSize: "16px",
    marginTop: "20px",
  },
  formulaDiv: {
    position: "relative",
    display: "block",
    padding: "15px",
    border: "1px solid #ccc",
    backgroundColor: "#f9f9f9",
    margin: "10px 0",
    borderRadius: "4px",
  },
  checkIcon: {
    position: "absolute",
    top: "5px",
    right: "5px",
    fontSize: "12px",
    color: "green",
  },
  copyIcon: {
    position: "absolute",
    top: "5px",
    right: "5px",
    cursor: "pointer",
    fontSize: "12px",
    color: "#888",
  },
  dotBounce: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: "10px",
    height: "10px",
    margin: "0 5px",
    backgroundColor: "#333",
    borderRadius: "50%",
  },
});

export const useMessageStyles = () => {
  return useStyles();
};
