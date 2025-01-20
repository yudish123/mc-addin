import React, { useEffect, useState } from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import { Spinner, Toaster, mergeClasses } from "@fluentui/react-components";
import { useSearchParams, useLocation } from "react-router-dom";
import FormRowInput from "../components/Form/FormRowInput";
import { config } from "../config/index";
import { changeSubscriptionApi, createCreditPaymentIntent } from "../api/payment";
import { openPaymentDialog, openXpayDialog } from "../utils/Events/Dialogevents";
import { AddCircle20Filled } from "@fluentui/react-icons";
import { Dimensions } from "../utils/constants";
import { useToast } from "../hooks/useToast";
import { useAuthContext, useAuthDispatch } from "../context/Authcontext/selectors";
import { getRealtimeChannel } from "../api/supabase/channels";
import { supabase } from "../api/supabase/client";

const BillingInfo = () => {
  const globalStyles = useGlobalstyles();
  const [loading, setLoading] = useState(false);
  const authState = useAuthContext();
  const authDispatch = useAuthDispatch();

  const isInr = authState.user.subscription_id.includes("sub_");

  const [searchParams] = useSearchParams();

  const { failureToast, toasterId, dispatchToast } = useToast();

  const plan_id = searchParams.get("plan_id");

  const location = useLocation();

  const change = location?.state?.change ?? false;

  const intitalPlan = config.plans.find((plan) => plan.value === plan_id);

  const [formData, setFormData] = React.useState({
    plan: intitalPlan ?? config.plans[0],
    credits: 1000,
  });

  const { plan, credits } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // buy credits
  const startPayment = async () => {
    console.log("start payment");
    if (!authState?.user || !authState?.token) {
      failureToast("Please login to continue");
      return;
    }

    if (!authState?.user?.subscription_id) {
      failureToast("Users without subscriptions cannot buy credits");
      return;
    }

    if (credits < 1000 || credits % 1000 !== 0) {
      failureToast("Credits must be a multiple of 100 and greater than equal to 1000");
      return;
    }
    setLoading(true);
    try {
      if (isInr) {
        openPaymentDialog(
          null,
          "rzp_test_oNBhKNOx62Q1cU",
          authState.user.email,
          false,
          credits,
          dispatchToast,
          authState.refreshState,
          authDispatch,
          authState.user
        );
      } else {
        const response = await createCreditPaymentIntent(credits, authState.token);
        console.log(response);
        if (!response.success) {
          failureToast(response.error);
          return;
        }
        openXpayDialog(
          null,
          credits,
          response.data,
          dispatchToast,
          authState.refreshState,
          authDispatch,
          authState.user
        );
      }
    } catch (error) {
      console.log(error);
      failureToast("Something went wrong while initiating payment");
    } finally {
      setLoading(false);
    }
  };

  const changeSubscription = async () => {
    setLoading(true);
    try {
      const response = await changeSubscriptionApi(authState.token, plan.value);
      if (!response.success) {
        failureToast(response.error);
        return;
      }
      console.log(resp);
    } catch (error) {
      console.log(error);
      failureToast("Somethin went wrong while initiating payment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authState.user) {
      // Get the existing channel or create a new one if it doesn't exist
      getRealtimeChannel(authState.user, authDispatch);

      // Cleanup on unmount
      return () => {
        supabase.removeChannel(getRealtimeChannel(authState.user, authDispatch));
      };
    }
  }, []);

  return (
    <>
      <div className={globalStyles.container}>
        <FormRowInput
          type={"number"}
          handleChange={handleChange}
          value={credits}
          name={"credits"}
          afterIcon={
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                zIndex: 50,
                position: "absolute",
                right: Dimensions.spacing.extraSmall,
                top: "52%",
              }}
              onClick={(e) => {
                e.stopPropagation();
                setFormData({ ...formData, credits: Number(formData.credits) + 1000 });
              }}
            >
              <AddCircle20Filled
                style={{
                  color: "gray",
                }}
              />
            </button>
          }
          labelText={"Add Credits"}
        />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button
            disabled={loading}
            onClick={change ? changeSubscription : startPayment}
            style={{ width: "50%", display: "flex", gap: "10px", justifyContent: "center" }}
            className={mergeClasses(globalStyles.accentBtn, globalStyles.marginTopMedium)}
          >
            {!change ? "Buy Credits" : "Upgrade"}
            {loading ? <Spinner size="tiny" /> : <></>}
          </button>
        </div>
      </div>

      <Toaster toasterId={toasterId} />
    </>
  );
};

export default BillingInfo;
