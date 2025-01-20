import React, { useEffect, useState } from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import BillingCardLayout from "../components/Layout/Billing/Cards.js";
import {
  Button,
  Image,
  mergeClasses,
  Spinner,
  Text,
  Toaster,
  Tooltip,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { useAuthContext, useAuthDispatch } from "../context/Authcontext/selectors";
import { cancelSubscription } from "../api/payment";
import CacheSwitch from "../components/Settings/CacheSwitch";
import { useSettingsStyles } from "../hooks/styles/settings/usePagestyles";
import { useNavigate } from "react-router-dom";
import { failureToast, successToast } from "../utils/Helpers/toast";
import { Dimensions } from "../utils/constants";
import { Info12Regular } from "@fluentui/react-icons";
import { config } from "../config";
import { getRealtimeChannel } from "../api/supabase/channels";
import { supabase } from "../api/supabase/client";

const Billing = () => {
  const [loading, setLoading] = useState(false);
  const globalStyles = useGlobalstyles();
  const authState = useAuthContext();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();
  const pageStyles = useSettingsStyles();

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const subscription_credits = authState.user?.subscription_credits ?? 0;
  const topup_credits = authState.user?.credits ?? 0;
  const total_credits = subscription_credits + topup_credits;

  const cancelSubscriptionClick = async () => {
    if (!authState.user?.subscription_id) {
      failureToast("You have not subscribed to any plan", dispatchToast);
      return;
    }
    setLoading(true);
    const isInr = authState.user.subscription_id.includes("sub_");
    console.log(isInr);
    const resp = await cancelSubscription(authState.token, isInr);
    console.log(resp);
    if (resp?.success) {
      authState.refreshState();
      successToast("Subscription Cancelled Successfully", dispatchToast);
    } else {
      failureToast("Subscription Cancellation Failed", dispatchToast);
    }
    setLoading(false);
  };

  const getBillingCycle = () => {
    if (!authState?.user?.plan_type) return "No next payment scheduled";
    const readableName = config.planMap[authState?.user?.plan_type]?.read_name;
    if (readableName === "Free") return "";
    const cycle = readableName?.split(" ")[1];
    const cycleText = cycle?.substr(1, cycle?.length - 2);
    return cycleText[0].toUpperCase() + cycleText.slice(1);
  };

  const paymentCycle = getBillingCycle();

  useEffect(() => {
    if (authState.user) {
      // Get the existing channel or create a new one if it doesn't exist
      getRealtimeChannel(authState.user, dispatch);

      // Cleanup on unmount
      return () => {
        supabase.removeChannel(getRealtimeChannel(authState.user, dispatch));
      };
    }
  }, []);

  return (
    <div className={globalStyles.container}>
      <Toaster toasterId={toasterId} />
      <BillingCardLayout cardLabel={"Credits"}>
        {!authState.user || !authState.token ? (
          <>
            <Text className={mergeClasses(globalStyles.h4)}>
              Total Credits Left{" "}
              <span
                style={{ fontWeight: "600" }}
                className={mergeClasses(globalStyles.h5, pageStyles.creditsTag, globalStyles.marginLeftExtraSmall)}
              >
                0
              </span>
            </Text>
            <Text style={{ fontWeight: "600", color: "gray" }} className={globalStyles.h5}>
              Sign up to get 1000 free top-up credits
            </Text>
          </>
        ) : (
          <>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Image src="../../../assets/credit.svg" />
              <button
                onClick={() =>
                  navigate(`/billinginfo`, {
                    state: {
                      change: false,
                    },
                  })
                }
                className={mergeClasses(globalStyles.accentBtn, pageStyles.btns)}
              >
                Buy Credits
              </button>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                fontSize: Dimensions.fonts.small,
              }}
            >
              <Text style={{ fontWeight: "500", fontSize: "12px", color: "#344054" }}>
                Total Credits Left{" "}
                <span
                  style={{ fontWeight: "600", paddingBlock: "4px", fontSize: "11.5px" }}
                  className={mergeClasses(globalStyles.h5, pageStyles.creditsTag, globalStyles.marginLeftExtraSmall)}
                >
                  {total_credits}
                </span>
              </Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: Dimensions.spacing.small,
                  height: "22px",
                  marginTop: "4px",
                }}
              >
                <Text style={{ fontWeight: "400", fontSize: "11px", color: "gray" }} className={globalStyles.h5}>
                  <span style={{ marginLeft: "2px" }}>
                    <span className={mergeClasses(pageStyles.creditsTag, globalStyles.marginRightExtraSmall)}>
                      {subscription_credits}
                    </span>{" "}
                    Subscription Credits
                  </span>
                </Text>
                <Tooltip content={"credits reset after every month"}>
                  <Info12Regular color="gray" />
                </Tooltip>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: Dimensions.spacing.small, height: "22px" }}>
                <Text style={{ fontWeight: "400", fontSize: "11px", color: "gray" }} className={globalStyles.h5}>
                  <span style={{ marginLeft: "2px" }}>
                    <span className={mergeClasses(pageStyles.creditsTag, globalStyles.marginRightExtraSmall)}>
                      {topup_credits}
                    </span>{" "}
                    top-up credits
                  </span>
                </Text>
                <Tooltip content={"Topup credits do not expire"}>
                  <Info12Regular color="gray" />
                </Tooltip>
              </div>
            </div>
          </>
        )}
      </BillingCardLayout>
      {!authState.user ? (
        <></>
      ) : (
        <BillingCardLayout className={globalStyles.marginTopMedium} cardLabel={"Plan"}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ color: "#2BB173", fontWeight: "600" }} className={globalStyles.h3}>
              {config.planMap[authState?.user?.plan_type]?.read_name?.split(" ")[0]}{" "}
              {paymentCycle ? `- ${paymentCycle}` : ""}
            </Text>
            <button
              onClick={() => navigate(`/pricing`)}
              className={mergeClasses(globalStyles.accentBtn, pageStyles.btns)}
            >
              Change plan
            </button>
          </div>
          {authState.user.subscription_id ? (
            <Text style={{ fontSize: "11px", fontWeight: "400", textWrap: "nowrap", color: "#667085" }}>
              Billed {paymentCycle}
            </Text>
          ) : (
            <></>
          )}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: "12px", fontWeight: "400", textWrap: "nowrap", color: "#344054" }}>
              {!authState.user?.payment_time ? (
                "No next payment scheduled"
              ) : (
                <>Next Payment: {authState.user?.payment_time}</>
              )}
            </Text>

            <Button
              style={{ width: "max-content", padding: "0px", fontSize: "12px", fontWeight: "300" }}
              appearance="transparent"
              onClick={cancelSubscriptionClick}
              className={globalStyles.accentLink}
            >
              Cancel Subscription
              {loading ? <Spinner style={{ marginLeft: "6px" }} size="tiny" /> : null}
            </Button>
          </div>
        </BillingCardLayout>
      )}

      <BillingCardLayout className={globalStyles.marginTopMedium} cardLabel={"Cache"}>
        <>
          <div id="cache" className={pageStyles.accountCardItem}>
            <div className={pageStyles.accountCardTextBox}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text
                  style={{ fontWeight: "500", fontSize: "13px" }}
                  className={mergeClasses(globalStyles.marginTopZero)}
                >
                  Enable Cache{" "}
                  <span style={{ fontSize: "10px", fontWeight: "500", color: "gray" }}> (Recommended)</span>
                </Text>
              </div>
            </div>
            <CacheSwitch />
          </div>

          <Text style={{ fontWeight: "400", color: "#667085" }} className={globalStyles.h5}>
            If you disable cache, the entire sheet may reload at times, potentially incurring additional credits.
          </Text>
        </>
      </BillingCardLayout>
    </div>
  );
};

export default Billing;
