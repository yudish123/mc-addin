import React from "react";
import {
  Person16Regular,
  Location16Regular,
  CreditCardClock20Regular,
  Globe16Regular,
  QuestionCircle16Regular,
} from "@fluentui/react-icons";
import { Image } from "@fluentui/react-components";

export const AccountCardItems = [
  {
    isChevron: true,
    icon: <Person16Regular />,
    text: "Account Information",
  },
  {
    isChevron: true,
    icon: <Location16Regular />,
    text: "Address Information",
  },
  {
    isChevron: true,
    icon: <CreditCardClock20Regular />,
    text: "Payment Methods",
  },
];

export const GeneralCardItems = [
  {
    isChevron: false,
    icon: <Globe16Regular />,
    text: "Enable Cache",
    toggle: true, // Represents a toggle switch
  },
];

export const OthersCardItems = [
  {
    isChevron: true,
    icon: <QuestionCircle16Regular />,
    text: "Login/Logout",
  },
];

export const loginCardItem = {
  isChevron: true,
  icon: <Person16Regular />,
  text: "Login",
};

export const logoutCardItem = {
  isChevron: true,
  icon: <Image style={{ cursor: "pointer" }} src="../../../../../assets/logout.svg" />,
  text: "Logout",
};
