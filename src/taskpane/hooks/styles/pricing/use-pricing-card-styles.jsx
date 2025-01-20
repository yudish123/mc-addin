import { makeStyles, shorthands } from "@fluentui/react-components";
import { Dimensions, Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  card: {
    width: "100%",
    padding: "18px",
    display: "flex",
    boxShadow: "none",
    backgroundColor: "#ffffff",
    ...shorthands.border("0.8px", "solid", Colors.accent),
    position: "relative",
    ":before": {
      content: '""',
      position: "absolute",
      top: "0px",
      right: "0",
      width: "120px",
      height: "150px",
      backgroundImage: "url(../../../../../../../assets/plan-mc-bg.svg)",
      backgroundSize: "cover",
      backgroundPosition: "right top",
      backgroundRepeat: "no-repeat",
    },
    ":after": {
      content: '""',
      position: "absolute",
      top: "0px",
      right: "0",
      display: "block",
      width: "100%",
      height: "100%",
      backgroundImage:
        "linear-gradient(160deg, rgba(51, 196, 129, 0.6) 0%, rgba(51, 196, 129, 0.4) 10%, rgba(51, 196, 129, 0.2) 20%, rgba(255, 255, 255, 1) 100%)",
      opacity: "0.2", // Adjust opacity if necessary
      pointerEvents: "none", // Ensures this layer doesn't interfere with interactions
    },
    flexDirection: "column",
    borderRadius: Dimensions.spacing.large,
    gap: Dimensions.spacing.large,
  },

  cardDark: {
    color: `${Colors.white} !important`,
    backgroundColor: Colors.primary,
  },
  cardLight: {
    backgroundColor: "#ffffff",
  },
  titleDiv: {
    display: "flex",
    flexDirection: "column",
    gap: Dimensions.spacing.small,
  },
  description: {
    color: Colors.grayText,
    marginBottom: Dimensions.spacing.small,
  },
  price: {
    fontSize: Dimensions.fonts.extraLarge,
    fontWeight: "bold",
    color: Colors.accent,
    marginBottom: Dimensions.spacing.medium,
  },
  featureItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "13px",
    lineHeight: "22.4px",
    gap: Dimensions.spacing.medium,
    fontWeight: "400",
    marginBottom: Dimensions.spacing.medium,
  },
  recommaendedPill: {
    background: Colors.accentLight,
    color: "#2BB173",
    ...shorthands.border("1px", "solid", "#D9FBEB"),
    fontSize: "14px",
    paddingInline: Dimensions.spacing.small,
    borderRadius: "1000px",
    fontWeight: "500",
  },
  icon: {
    color: Colors.primary,
    marginRight: Dimensions.spacing.small,
  },
});

export const UsePricingCardStyles = () => {
  return useStyles();
};
