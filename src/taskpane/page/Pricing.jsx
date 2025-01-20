import React, { useState } from "react";
import { pricingData } from "../utils/strings/pricing";
import { usePricingstyles } from "../hooks/styles/pricing/usePricingstyles";
import PricingTabs from "../components/Layout/Pricing/Tabs";
import PlanCard from "../components/Layout/Pricing/PlanCard";
import { mergeClasses, Toaster, useId } from "@fluentui/react-components";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import FormSelect from "../components/Form/FormSelect";

const Pricing = () => {
  const [selectedValue, setSelectedValue] = React.useState("monthly");
  const onTabSelect = (event, data) => {
    setSelectedValue(data.value);
  };

  const [currency, setCurrency] = useState("usd");

  console.log(currency);

  const [loading, setLoading] = useState(false);

  const toasterId = useId("toaster-pricing");

  const pricingStyles = usePricingstyles();
  const globalStyles = useGlobalstyles();
  const currentPlans = selectedValue === "annually" ? pricingData.annual.plans : pricingData.monthly.plans;

  const currencies = [
    { label: "USD", value: "usd" },
    { label: "INR", value: "inr" },
  ];

  return (
    <div className={mergeClasses(pricingStyles.pageContainer, globalStyles.nunito)}>
      <div className={pricingStyles.currencyDropdownContainer}>
        <PricingTabs selectedValue={selectedValue} onTabSelect={onTabSelect} />
        <FormSelect
          className={pricingStyles.currencyDropdown}
          id="currency"
          options={currencies}
          handleChange={(event, data) => {
            setCurrency(data.value);
          }}
          name="currency"
          value={currency}
        />
      </div>
      <Toaster toasterId={toasterId} />
      <div className={pricingStyles.plansContainer}>
        {currentPlans.map((plan) => (
          <PlanCard
            loading={loading}
            setLoading={setLoading}
            isMonthly={selectedValue === "monthly"}
            key={plan.id}
            plan_id={plan.plan_id}
            description={plan.description}
            name={plan.name}
            isInr={currency === "inr"}
            price={currency === "usd" ? plan.usdPrice : plan.inrPrice}
            features={plan.features}
            isPopular={plan.isPopular}
            variant={plan.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default Pricing;
