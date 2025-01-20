// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import { makeStyles, shorthands } from "@fluentui/react-components";
import { Dimensions, Colors } from "../../../utils/constants";

const useStyles = makeStyles({
  accordionHeader: {
    color: "black",
    position: "relative",
    display: "flex",
    ":after": {
      content: "''",
      position: "absolute",
      top: "0",
      left: "0",
      opacity: "0.1",
      width: "100%",
      height: "100%",
      backgroundImage: "linear-gradient(to top left, #FFFFFF, #D0FFE9)",
    },
    cursor: "pointer",
    justifyContent: "space-between",
    paddingInline: Dimensions.spacing.large,
  },
  accordionHeaderText: {
    fontSize: "0.75rem",
    fontWeight: "600",
    letterSpacing: "0.6px",
  },
  accordionBodyOpen: {
    margin: Dimensions.spacing.zero,
    display: "flex",
    flexDirection: "column",
    maxHeight: "1000px",
    opacity: 1,
    marginTop: Dimensions.spacing.extraSmall,
    transition: "max-height 0.4s ease, opacity 0.4s ease",
    paddingInline: "12px!important",
  },
  accordionBodyClosed: {
    margin: Dimensions.spacing.zero,
    opacity: 0,
    display: "block",
    flexDirection: "column",
    maxHeight: "0px",
  },
  parameterCell: {
    paddingInline: Dimensions.spacing.medium,
    paddingBlock: Dimensions.spacing.medium,
    display: "flex",
    gap: "4px",
    flexDirection: "column",
  },
  parameterContainer: {
    borderRadius: Dimensions.spacing.medium,
    background: "white",
    ...shorthands.border("1px", "solid", "#F3F3F4"),
    paddingInline: Dimensions.spacing.small,
  },
  parameterDescription: {
    fontWeight: "500",
    lineHeight: 1.2,
    marginBottom: Dimensions.spacing.medium,
    color: Colors.primary,
  },
  carouselContainer: {
    display: "flex",
    background: "#fffff",
    borderRadius: Dimensions.spacing.small,
    width: "100%",
  },
  parameterAccordingHeading: {
    paddingBottom: Dimensions.spacing.small,
  },
  carouselBody: {
    width: "100%",
    wordWrap: "break-word", // Ensures long words break into the next line
    whiteSpace: "normal", // Allows text to wrap to the next line
    overflow: "hidden",
  },
  carouselCard: {
    minWidth: "170px",
    height: "97%",
    // paddingInline: Dimensions.spacing.moreLarge,
    // paddingBlock: Dimensions.spacing.medium,
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: Dimensions.spacing.medium,
    wordWrap: "break-word",
    wordBreak: "break-all",
    whiteSpace: "normal",
    overflow: "hidden",
    fontSize: "11px",
    fontWeight: "300",
    lineHeight: "20px",
    maxWidth: "100% !important",
    ...shorthands.border("1px", "solid", "#CBEFDE"),
    background: "white",
  },
  carouselDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "gray",
  },
  activeCarouselDot: {
    width: "10px",
    height: "10px",
    background: Colors.accent,
    borderRadius: "50%",
  },
  carouselHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    width: "100%",
  },
  navigationButtons: {
    display: "flex",
    alignItems: "center",
    paddingBottom: Dimensions.spacing.extraSmall,
    marginTop: Dimensions.spacing.extraSmall,
    gap: Dimensions.spacing.small, // Adds space between the navigation buttons
  },
  carouselIndex: {
    fontSize: Dimensions.fonts.small,
    fontWeight: "300",
  },
  accordionArrow: {
    transition: "all 0.3s ease-in-out",
  },
  accordionArrowOpen: {
    transform: "rotate(-180deg)",
    transition: "all 0.3s ease-in-out",
  },
  borderStartRadius: {
    borderTopLeftRadius: Dimensions.spacing.medium,
    borderTopRightRadius: Dimensions.spacing.medium,
  },
  borderEndRadius: {
    borderBottomLeftRadius: Dimensions.spacing.medium,
    borderBottomRightRadius: Dimensions.spacing.medium,
  },
  borderEndRadiusZero: {
    borderBottomLeftRadius: `${Dimensions.spacing.zero} !important`,
    borderBottomRightRadius: `${Dimensions.spacing.zero} !important`,
  },
  // carouselHeaderText: {
  //   // paddingLeft: Dimensions.spacing.small,
  //   // paddingBottom: Dimensions.spacing.small,
  // },
});

export const useFunctionStyles = () => {
  return useStyles();
};
