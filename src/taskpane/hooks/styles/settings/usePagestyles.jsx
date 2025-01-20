import { makeStyles, shorthands } from "@fluentui/react-components";
import { Colors, Dimensions } from "../../../utils/constants";

const useStyles = makeStyles({
  cardContainer: {
    padding: Dimensions.spacing.medium,
    paddingBlock: Dimensions.spacing.large,
    background: "#FFFFFF",
    borderRadius: "12px",
    marginTop: Dimensions.spacing.small,
    boxShadow: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
  },
  imageContianer: {
    display: "flex",
    gap: Dimensions.spacing.small,
    alignItems: "center",
  },
  mainImage: {
    background: "white",
    borderRadius: "100%",
  },
  accountInfoContainer: {
    display: "flex",
    flexDirection: "column",
  },
  accountInfoHeader: {
    fontSize: Dimensions.fonts.large,
    fontWeight: "700",
  },
  accountInfoSubheader: {
    fontSize: Dimensions.fonts.medium,
    fontWeight: "600",
    color: Colors.muted,
  },
  cardHeading: {
    fontSize: Dimensions.fonts.medium,
    fontWeight: "700",
    marginTop: `${Dimensions.spacing.medium}`,
  },
  accountCardItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  accountCardTextBox: {
    display: "flex",
    fontSize: Dimensions.fonts.small,
    fontWeight: "700",
    alignItems: "center",
    gap: Dimensions.spacing.small,
  },
  btns: {
    width: "85px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "600",
    fontSize: "12px",
    paddingInline: "0px",
    paddingBlock: Dimensions.spacing.extraSmall,
    height: "25px",
  },
  creditsTag: {
    color: "#4DAA81",
    borderRadius: "6px",
    background: Colors.accentLight,
    paddingInline: Dimensions.spacing.small,
    fontWeight: "500",
    display: "inline-block",
    minWidth: "20px!important",
    ...shorthands.border("0.2px", "solid", "#9ADABE"),
  },
});

export const useSettingsStyles = () => {
  return useStyles();
};
