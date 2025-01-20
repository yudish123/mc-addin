// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { makeStyles } from "@fluentui/react-components";
import { Colors, Dimensions } from "../../utils/constants";
const useStyles = makeStyles({
  container: {
    padding: Dimensions.spacing.large,
    backgroundColor: "white",
    minHeight: "90vh",
  },
  accentBtn: {
    width: "100%",
    padding: Dimensions.spacing.medium,
    backgroundColor: Colors.accent,
    borderRadius: "8px",
    outline: "none",
    fontWeight: "600",
    fontSize: Dimensions.fonts.medium,
    border: "none",
    color: `#ffffff !important`,
    ":hover": {
      backgroundColor: `${Colors.accentNinty} !important`,
    },
  },
  disabledBtn: {
    color: `white !important`,
    backgroundColor: `#D3D3D3 !important`,
    cursor: "not-allowed",
    ":hover": {
      backgroundColor: `#D3D3D3 !important`,
    },
  },
  accentLink: {
    color: Colors.accent,
    textDecoration: "none",
    fontWeight: "400 !important",
    padding: "0px",
    fontSize: Dimensions.fonts.medium,
  },
  textMuted: {
    color: `${Colors.muted} !important`,
    fontSize: Dimensions.fonts.medium,
    fontWeight: "600 ",
  },
  h1: {
    fontSize: "18px",
    fontWeight: "600",
  },
  h2: {
    fontSize: "16px",
    fontWeight: "600",
  },
  h3: {
    fontSize: "14px",
    fontWeight: "500",
  },
  h4: {
    fontSize: "12px",
    fontWeight: "500",
  },
  h5: {
    fontSize: "10px",
    fontWeight: "300",
  },
  h6: {
    fontSize: "8px",
    fontWeight: "300",
  },
  // Margin Top Utilities
  marginTopExtraSmall: {
    marginTop: Dimensions.spacing.extraSmall,
  },
  marginTopSmall: {
    marginTop: Dimensions.spacing.small,
  },
  marginTopMedium: {
    marginTop: Dimensions.spacing.medium,
  },
  marginTopLarge: {
    marginTop: Dimensions.spacing.large,
  },
  marginTopExtraLarge: {
    marginTop: Dimensions.spacing.extraLarge,
  },
  marginTopZero: {
    marginTop: Dimensions.spacing.zero,
  },

  // Margin Bottom Utilities
  marginBottomExtraSmall: {
    marginBottom: Dimensions.spacing.extraSmall,
  },
  marginBottomSmall: {
    marginBottom: Dimensions.spacing.small,
  },
  marginBottomMedium: {
    marginBottom: Dimensions.spacing.medium,
  },
  marginBottomLarge: {
    marginBottom: Dimensions.spacing.large,
  },
  marginBottomExtraLarge: {
    marginBottom: Dimensions.spacing.extraLarge,
  },
  marginBottomZero: {
    marginBottom: Dimensions.spacing.zero,
  },

  // Padding Utilities
  paddingTopExtraSmall: {
    paddingTop: Dimensions.spacing.extraSmall,
  },
  paddingTopSmall: {
    paddingTop: Dimensions.spacing.small,
  },
  paddingTopMedium: {
    paddingTop: Dimensions.spacing.medium,
  },
  paddingTopLarge: {
    paddingTop: Dimensions.spacing.large,
  },
  paddingTopExtraLarge: {
    paddingTop: Dimensions.spacing.extraLarge,
  },
  paddingTopZero: {
    paddingTop: Dimensions.spacing.zero,
  },

  paddingBottomExtraSmall: {
    paddingBottom: Dimensions.spacing.extraSmall,
  },
  paddingBottomSmall: {
    paddingBottom: Dimensions.spacing.small,
  },
  paddingBottomMedium: {
    paddingBottom: Dimensions.spacing.medium,
  },
  paddingBottomLarge: {
    paddingBottom: Dimensions.spacing.large,
  },
  paddingBottomExtraLarge: {
    paddingBottom: Dimensions.spacing.extraLarge,
  },
  paddingBottomZero: {
    paddingBottom: Dimensions.spacing.zero,
  },
  marginAuto: {
    marginInline: "auto",
  },
  paddingLeftExtraSmall: {
    paddingLeft: Dimensions.spacing.extraSmall,
  },
  paddingLeftSmall: {
    paddingLeft: Dimensions.spacing.small,
  },
  paddingLeftMedium: {
    paddingLeft: Dimensions.spacing.medium,
  },
  paddingLeftLarge: {
    paddingLeft: Dimensions.spacing.large,
  },
  paddingLeftExtraLarge: {
    paddingLeft: Dimensions.spacing.extraLarge,
  },
  paddingLeftZero: {
    paddingLeft: Dimensions.spacing.zero,
  },

  paddingRightExtraSmall: {
    paddingRight: Dimensions.spacing.extraSmall,
  },
  paddingRightSmall: {
    paddingRight: Dimensions.spacing.small,
  },
  paddingRightMedium: {
    paddingRight: Dimensions.spacing.medium,
  },
  paddingRightLarge: {
    paddingRight: Dimensions.spacing.large,
  },
  paddingRightExtraLarge: {
    paddingRight: Dimensions.spacing.extraLarge,
  },
  paddingRightZero: {
    paddingRight: Dimensions.spacing.zero,
  },

  // Padding Block Utilities
  paddingBlockExtraSmall: {
    paddingBlock: Dimensions.spacing.extraSmall,
  },
  paddingBlockSmall: {
    paddingBlock: Dimensions.spacing.small,
  },
  paddingBlockMedium: {
    paddingBlock: Dimensions.spacing.medium,
  },
  paddingBlockLarge: {
    paddingBlock: Dimensions.spacing.large,
  },
  paddingBlockExtraLarge: {
    paddingBlock: Dimensions.spacing.extraLarge,
  },
  paddingBlockZero: {
    paddingBlock: Dimensions.spacing.zero,
  },

  // Padding Inline Utilities
  paddingInlineExtraSmall: {
    paddingInline: Dimensions.spacing.extraSmall,
  },
  paddingInlineSmall: {
    paddingInline: Dimensions.spacing.small,
  },
  paddingInlineMedium: {
    paddingInline: Dimensions.spacing.medium,
  },
  paddingInlineLarge: {
    paddingInline: Dimensions.spacing.large,
  },
  paddingInlineExtraLarge: {
    paddingInline: Dimensions.spacing.extraLarge,
  },
  paddingInlineZero: {
    paddingInline: Dimensions.spacing.zero,
  },

  // Margin Left Utilities
  marginLeftExtraSmall: {
    marginLeft: Dimensions.spacing.extraSmall,
  },
  marginLeftSmall: {
    marginLeft: Dimensions.spacing.small,
  },
  marginLeftMedium: {
    marginLeft: Dimensions.spacing.medium,
  },
  marginLeftLarge: {
    marginLeft: Dimensions.spacing.large,
  },
  marginLeftExtraLarge: {
    marginLeft: Dimensions.spacing.extraLarge,
  },
  marginLeftZero: {
    marginLeft: Dimensions.spacing.zero,
  },

  // Margin Right Utilities
  marginRightExtraSmall: {
    marginRight: Dimensions.spacing.extraSmall,
  },
  marginRightSmall: {
    marginRight: Dimensions.spacing.small,
  },
  marginRightMedium: {
    marginRight: Dimensions.spacing.medium,
  },
  marginRightLarge: {
    marginRight: Dimensions.spacing.large,
  },
  marginRightExtraLarge: {
    marginRight: Dimensions.spacing.extraLarge,
  },
  marginRightZero: {
    marginRight: Dimensions.spacing.zero,
  },
  courierPrime: {
    fontFamily: "Courier Prime, monospace",
  },
  nunito: {
    fontFamily: "Nunito, sans-serif",
  },
  montserrat: {
    fontFamily: "Montserrat, sans-serif",
  },
  borderBottom: {
    borderBottom: "1px solid #2B3856",
  },
  fontWeight200: {
    fontWeight: "200",
  },
  fontWeight300: {
    fontWeight: "300",
  },
  fontWeight400: {
    fontWeight: "400",
  },
  fontWeight500: {
    fontWeight: "500",
  },
  fontWeight600: {
    fontWeight: "600",
  },
  fontWeight700: {
    fontWeight: "700",
  },
  fontWeight800: {
    fontWeight: "800",
  },
  fontWeight900: {
    fontWeight: "900",
  },
  colorMuted: {
    color: "#CACACA",
  },
  tag: {
    color: Colors.accent,
    fontSize: Dimensions.fonts.small,
    backgroundColor: Colors.accentLight,
    fontWeight: "600",
    borderRadius: "4px",
    marginTop: "4px",
    marginLeft: "5px",
    paddingBlock: Dimensions.spacing.zero,
    width: "fit-content",
  },
});
export const useGlobalstyles = () => {
  return useStyles();
};
