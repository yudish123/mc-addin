import React from "react";
import { Card, Image, Text, Toaster, mergeClasses } from "@fluentui/react-components";
import { UsePricingCardStyles } from "../../../hooks/styles/pricing/use-pricing-card-styles";
import { useGlobalstyles } from "../../../hooks/styles/useGlobalstyles";
import { Colors } from "../../../utils/constants";
import { openLoginDialog, openPaymentDialog, openXpayDialog } from "../../../utils/Events/Dialogevents";
import { useNavigate } from "react-router-dom";
import { changeSubscriptionApi, createSubscription } from "../../../api/payment";
import { useAuthContext, useAuthDispatch } from "../../../context/Authcontext/selectors";
import { useToast } from "../../../hooks/useToast";
import LoadingOverlay from "../Globals/LoadingOverlay";

const PlanCard = ({ name, variant, plan_id, price, features, isMonthly, description, loading, isInr, setLoading }) => {
  const classes = UsePricingCardStyles();
  const globalStyles = useGlobalstyles();
  const dispatch = useAuthDispatch();
  const navigate = useNavigate();

  const authState = useAuthContext();

  console.log(price, name);

  const { failureToast, toasterId, dispatchToast, successToast } = useToast();

  const startPayment = async () => {
    if (name === "Free" && (!authState.user || !authState?.token)) {
      openLoginDialog(dispatch);
      return;
    }

    if (!authState?.user || !authState?.token) {
      failureToast("Please login to continue");
      return;
    }

    if ((authState?.user?.plan_type === "free" || !authState?.user?.subscription_id) && name === "Free") {
      failureToast("You already have a free plan or you or on a better plan");
      return;
    }

    setLoading(true);
    try {
      const response = await createSubscription(
        plan_id,
        authState?.user.email,
        authState.user.name ?? authState?.user?.email,
        authState?.token,
        isInr
      );
      setLoading(false);
      if (!response.success) {
        failureToast("Something went wrong");
        return;
      }
      if (isInr) {
        openPaymentDialog(
          response.subscription_id,
          "rzp_test_oNBhKNOx62Q1cU",
          authState.user.email,
          true,
          0,
          dispatchToast,
          authState.refreshState
        );
      } else {
        openXpayDialog(response.subscription_link, null, null, dispatchToast, authState.refreshState);
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
      console.log(authState.user);
      const isInr = authState.user.subscription_id.includes("sub_");

      const response = await changeSubscriptionApi(
        authState.token,
        plan_id,
        authState.user.email,
        authState.user.name ?? authState?.user?.email,
        isInr
      );
      if (!response.success) {
        failureToast(response.error ?? "Something went wrong");
        return;
      }
      if (isInr) {
        await authState.refreshState();
        successToast("Subscription changed successfully");
        return;
      }
      console.log(response);
      openXpayDialog(response.subscription_link, null, null, dispatchToast, authState.refreshState);
    } catch (error) {
      console.log(error);
      failureToast("Somethin went wrong while initiating payment");
    } finally {
      setLoading(false);
    }
  };

  console.log(variant);
  return (
    <>
      {loading ? <LoadingOverlay /> : <></>}
      <Toaster position="top" toasterId={toasterId} />
      <Card className={mergeClasses(classes.card, variant === "light" ? classes.cardLight : classes.cardDark)}>
        <div className={mergeClasses(classes.titleDiv, variant === "light" ? classes.cardLight : classes.cardDark)}>
          {name !== "Professional" ? (
            <Text
              style={{ fontSize: "18px" }}
              className={mergeClasses(globalStyles.h1, globalStyles.marginTopZero, globalStyles.marginBottomZero)}
            >
              {name}
            </Text>
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Text
                style={{ fontSize: "18px" }}
                className={mergeClasses(globalStyles.h1, globalStyles.marginTopZero, globalStyles.marginBottomZero)}
              >
                {name}
              </Text>
              <div className={classes.recommaendedPill}>Recommended</div>
            </div>
          )}
          <div style={{ marginTop: "8px" }}>
            <Text style={{ fontSize: "24px" }} className={globalStyles.h2}>
              {price}
            </Text>
            {price !== "Custom" && (
              <Text style={{ fontSize: "12px", fontWeight: "400" }} className={globalStyles.h3}>
                {isMonthly ? " / month" : " / year"}
              </Text>
            )}
          </div>
          <Text
            style={{ color: "#667085", fontSize: "12px", lineHeight: "22.4px" }}
            className={mergeClasses(globalStyles.h3, globalStyles.fontWeight400)}
          >
            {description}
          </Text>
        </div>
        <div style={{ borderBottom: "1.5px solid #F2F4F7" }}></div>
        <div>
          {features.map((feature, ind) => (
            <div style={variant === "dark" ? { color: "white" } : {}} key={ind} className={classes.featureItem}>
              {feature.included ? (
                <>
                  {" "}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2px",
                      width: "15px",
                      background: Colors.accentLight,
                      height: "15px",
                      borderRadius: "100%",
                    }}
                  >
                    <Image src={`../../../../../assets/greentick.svg`} alt="cross" />{" "}
                  </div>
                  <span style={{ color: "#344054" }}>{feature.name}</span>
                </>
              ) : (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      padding: "2px",
                      width: "15px",
                      background: Colors.grayText,
                      height: "15px",
                      borderRadius: "100%",
                    }}
                  >
                    <Image src={`../../../../../assets/gray-line.svg`} alt="cross" />{" "}
                  </div>{" "}
                  <span style={{ color: "#98A2B3" }}>{feature.name}</span>
                </>
              )}
            </div>
          ))}
        </div>
        <button
          disabled={loading}
          onClick={!authState?.user?.subscription_id ? startPayment : changeSubscription}
          style={{ color: "white" }}
          className={mergeClasses(globalStyles.accentBtn, loading ? globalStyles.disabledBtn : "")}
        >
          {!authState?.user?.subscription_id ? "Get Started" : "Change Plan"}
        </button>
      </Card>
    </>
  );
};

export default PlanCard;
