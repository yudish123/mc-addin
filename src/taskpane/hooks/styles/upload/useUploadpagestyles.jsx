import { makeStyles, checkboxClassNames, shorthands } from "@fluentui/react-components";
import { Colors, Dimensions } from "../../../utils/constants";

const useStyles = makeStyles({
  titleContainer: {
    fontSize: Dimensions.fonts.large,
    fontWeight: "700",
    display: "flex",
    flexDirection: "column",
    gap: Dimensions.spacing.small,
  },
  checkbox: {
    "> div": {
      background: "white",
      marginInline: "0px",
      borderRadius: "4px",
      ...shorthands.border("0.6px", "solid", "lightgray"),
    },
  },
  fileContainer: {
    display: "flex",
    flexDirection: "column",
    gap: Dimensions.spacing.small,
    marginTop: Dimensions.spacing.large,
  },
  dropzone: {
    padding: Dimensions.spacing.extraLarge,
    display: "flex",
    marginTop: Dimensions.spacing.large,
    position: "relative",
    flexDirection: "column",
    gap: Dimensions.spacing.extraSmall,
    cursor: "pointer",
    borderRadius: Dimensions.spacing.small,
    justifyContent: "center",
    alignItems: "center",
    ...shorthands.border("0.8px", "solid", "#D0D5DD"),
  },
  dropzoneDisabled: {
    ...shorthands.border("2px", "dashed", Colors.grayText),
    backgroundColor: Colors.grayText,
    cursor: "not-allowed",
    "::after": {
      position: "absolute",
      height: "100%",
      width: "100%",
      content: "",
      backgroundColor: Colors.grayText,
      opacity: 0.5,
    },
  },
  browseBtn: {
    width: "60%",
    borderRadius: Dimensions.spacing.medium,
    marginTop: Dimensions.spacing.large,
  },
  fileBox: {
    background: "#F9FAFB",
    padding: Dimensions.spacing.medium,
    paddingInline: "8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: Dimensions.spacing.small,
  },
  menuIconContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  iconContainer: {
    padding: Dimensions.spacing.extraSmall,
    borderRadius: Dimensions.spacing.extraSmall,
    background: "#DBE3F6",
    width: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "15px",
  },
  fileInfoContainer: {
    display: "flex",
    alignItems: "center",
    gap: Dimensions.spacing.small,
  },
  spinner: {
    color: Colors.accent,
  },
  fileInfo: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  fileInput: {
    height: "15px!important",
    width: "100%",
    fontSize: Dimensions.fonts.small,
  },
  hr: {
    marginBlock: "0px",
    marginInline: "12px",
    ...shorthands.border("1.2px", "solid", "#F3F6F8"),
    borderBottom: "none",
  },
});

export const useUploadStyles = () => {
  return useStyles();
};
