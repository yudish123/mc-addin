import React, { useState } from "react";
import { useGlobalstyles } from "../hooks/styles/useGlobalstyles";
import BillingCardLayout from "../components/Layout/Billing/Cards.js";
import {
  Button,
  mergeClasses,
  Spinner,
  Text,
  Toaster,
  Tooltip,
  useId,
  useToastController,
} from "@fluentui/react-components";
import { useAuthContext } from "../context/Authcontext/selectors";
import { cancelSubscription } from "../api/payment";
import CacheSwitch from "../components/Settings/CacheSwitch";
import { useSettingsStyles } from "../hooks/styles/settings/usePagestyles";
import { useNavigate } from "react-router-dom";
import { failureToast, successToast } from "../utils/Helpers/toast";
import { Dimensions } from "../utils/constants";
import { Info12Regular } from "@fluentui/react-icons";
import { config } from "../config";

const Billing = () => {
  const [loading, setLoading] = useState(false);
  const globalStyles = useGlobalstyles();
  const authState = useAuthContext();
  const navigate = useNavigate();
  const pageStyles = useSettingsStyles();

  const toasterId = useId("toaster");
  const { dispatchToast } = useToastController(toasterId);

  const cancelSubscriptionClick = async () => {
    setLoading(true);
    const resp = await cancelSubscription(authState.token);
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
    const cycle = readableName?.split(" ")[1];
    return cycle?.substr(1, cycle?.length - 2);
  };

  return (
    <div className={globalStyles.container}>
      <Toaster toasterId={toasterId} />
      <BillingCardLayout cardLabel={"Credits"}>
        {!authState.user || !authState.token ? (
          <>
            <Text className={globalStyles.h4}>0 credits left</Text>
            <Text style={{ fontWeight: "600", color: "gray" }} className={globalStyles.h5}>
              Sign up to get 1000 free top-up credits
            </Text>
          </>
        ) : (
          <>
            <Text className={globalStyles.h4}>
              {(authState?.user?.subscription_credits ?? 0) + (authState?.user?.credits ?? 0)} total credits left
            </Text>
            <div style={{ display: "flex", flexDirection: "column", fontSize: Dimensions.fonts.small }}>
              <div style={{ display: "flex", alignItems: "center", gap: Dimensions.spacing.small, height: "22px" }}>
                <Text style={{ fontWeight: "600", color: "gray" }} className={globalStyles.h5}>
                  -{" "}
                  <span style={{ marginLeft: "2px" }}>{authState.user.subscription_credits} subscription credits</span>
                </Text>
                <Tooltip content={"credits reset after every month"}>
                  <Info12Regular color="gray" />
                </Tooltip>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: Dimensions.spacing.small, height: "22px" }}>
                <Text style={{ fontWeight: "600", color: "gray" }} className={globalStyles.h5}>
                  {" "}
                  - <span style={{ marginLeft: "2px" }}>{authState.user.credits} top-up credits</span>
                </Text>
                <Tooltip content={"Topup credits do not expire"}>
                  <Info12Regular color="gray" />
                </Tooltip>
              </div>
            </div>
            <button onClick={() => navigate(`/billinginfo`)} className={globalStyles.accentBtn}>
              Buy Credits
            </button>
          </>
        )}
      </BillingCardLayout>
      {!authState.user ? (
        <></>
      ) : (
        <BillingCardLayout className={globalStyles.marginTopMedium} cardLabel={"Plan"}>
          <Text className={globalStyles.h4}>
            {config.planMap[authState?.user?.plan_type]?.read_name?.split(" ")[0]}
          </Text>
          {authState.user.subscription_id ? (
            <Text className={globalStyles.textMuted}>Billed {getBillingCycle()}</Text>
          ) : (
            <></>
          )}

          <Text className={globalStyles.textMuted}>
            Next Payment: {authState.user?.payment_time ?? "No next payment scheduled"}
          </Text>
          <Button
            style={{ width: "max-content", padding: "0px" }}
            appearance="transparent"
            onClick={cancelSubscriptionClick}
            className={globalStyles.accentLink}
          >
            Cancel Subscription
            {loading ? <Spinner style={{ marginLeft: "6px" }} size="tiny" /> : null}
          </Button>
          <button onClick={() => navigate(`/pricing`)} className={globalStyles.accentBtn}>
            Change plan
          </button>
        </BillingCardLayout>
      )}

      <BillingCardLayout className={globalStyles.marginTopMedium} cardLabel={"Cache"}>
        <>
          <div className={pageStyles.accountCardItem}>
            <div className={pageStyles.accountCardTextBox}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Text style={{ fontWeight: "600" }} className={mergeClasses(globalStyles.marginTopZero)}>
                  Enable Cache{" "}
                  <span style={{ fontSize: "12px", fontWeight: "700", color: "gray" }}> (Recommended)</span>
                </Text>
              </div>
            </div>
            <CacheSwitch />
          </div>

          <Text style={{ fontWeight: "600", color: "gray" }} className={globalStyles.h5}>
            If you disable cache, the entire sheet may reload at times, potentially incurring additional credits.
          </Text>
        </>
      </BillingCardLayout>
    </div>
  );
};

export default Billing;
