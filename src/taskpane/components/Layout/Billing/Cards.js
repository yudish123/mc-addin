import { Card, Text } from "@fluentui/react-components";
import React from "react";
import { useBillingStyles } from "../../../hooks/styles/billing/use-billing-styles";

const Cards = ({ cardLabel, className, children }) => {
  const billingStyles = useBillingStyles();
  return (
    <div className={className}>
      <Text className={billingStyles.cardLabel}>{cardLabel}</Text>
      <Card className={billingStyles.card}>{children}</Card>
    </div>
  );
};

export default Cards;
