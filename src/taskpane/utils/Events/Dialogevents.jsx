import { verifyCreditsPayment, verifyPayment, xpayCreditsVerify } from "../../api/payment";
import { getItem } from "../Helpers/localstorage";
import { setItem } from "../Helpers/officeStorage";
import { failureToast, successToast } from "../Helpers/toast";

export async function openLoginDialog(dispatch) {
  Office.context.ui.displayDialogAsync(
    `${window.location.origin}/#/auth`,
    { height: 60, width: 40, promptBeforeOpen: false },
    (result) => {
      if (result.status === Office.AsyncResultStatus.Failed) {
        console.error("Failed to open dialog:", result.error.message);
      } else {
        const dialog = result.value;

        // Listen for messages from the dialog
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
          const message = JSON.parse(arg.message);
          console.log(message);
          if (message.action === "SUCCESS") {
            console.log(message.user);
            try {
              setItem("user", message.user);
              setItem("accessToken", message.accessToken);
            } catch (error) {
              console.error(error);
            }

            dispatch({ type: "LOGIN", payload: message });
          } else {
            console.error("Authentication failed:", message);
          }
          dialog.close();
        });
      }
    }
  );
}

export async function openLogoutDialog(dispatch) {
  Office.context.ui.displayDialogAsync(
    `${window.location.origin}/#/logoutinit`,
    { height: 40, width: 30, promptBeforeOpen: false },
    (result) => {
      if (result.status === Office.AsyncResultStatus.Failed) {
        console.error("Failed to open logout dialog:", result.error.message);
      } else {
        const dialog = result.value;

        // Listen for messages from the logout dialog
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, (arg) => {
          const message = JSON.parse(arg.message);
          if (message.action === "SUCCESS") {
            console.log("Logout successful");
            dispatch({ type: "LOGOUT" });
          } else {
            console.error("Logout failed");
          }
          dialog.close();
        });
      }
    }
  );
}

export async function openPaymentDialog(
  id,
  key,
  email,
  isSubscription,
  credits,
  dispatchToast,
  refreshState,
  authDispatch,
  user
) {
  Office.context.ui.displayDialogAsync(
    `${window.location.origin}/pay.html/?key=${key}&id=${id}&email=${email}&isSubscription=${isSubscription}&credits=${credits}`,
    { height: 60, width: 30, promptBeforeOpen: false },
    (result) => {
      if (result.status === Office.AsyncResultStatus.Failed) {
        console.error("Failed to open logout dialog:", result.error.message);
      } else {
        const dialog = result.value;

        // Listen for messages from the logout dialog
        dialog.addEventHandler(Office.EventType.DialogMessageReceived, async (arg) => {
          const message = JSON.parse(arg.message);
          console.log(message);
          if (message.action === "SUCCESS") {
            const token = getItem("accessToken");
            const { response } = message;
            console.log(isSubscription, response);
            if (isSubscription) {
              await verifyPayment(
                token,
                response.razorpay_subscription_id,
                response.razorpay_signature,
                response.razorpay_payment_id,
                true
              );
              await refreshState();
            } else {
              verifyCreditsPayment(token, response.razorpay_payment_id);
              authDispatch({ type: "UPDATE_USER", payload: { ...user, credits: credits + user.credits } });
              successToast("Payment successful credits added", dispatchToast);
            }
          } else {
            failureToast("Payment failed", dispatchToast);
          }
          dialog.close();
        });
      }
    }
  );
}

export async function openXpayDialog(url, credits, intent_id, dispatchToast, refreshState, authDispatch, user) {
  if (url) {
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/#/xpay-init?url=${url}`,
      { height: 60, width: 30, promptBeforeOpen: false },
      (result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          console.error("Failed to open logout dialog:", result.error.message);
        } else {
          const dialog = result.value;

          // Listen for messages from the logout dialog
          dialog.addEventHandler(Office.EventType.DialogMessageReceived, async (arg) => {
            const message = JSON.parse(arg.message);
            console.log(message);
            if (message.action === "SUCCESS") {
              successToast("Payment successful", dispatchToast);
              await refreshState();
            } else {
              failureToast("Payment failed", dispatchToast);
            }
            dialog.close();
          });
        }
      }
    );
  } else {
    Office.context.ui.displayDialogAsync(
      `${window.location.origin}/#/xpay-init?intent_id=${intent_id}`,
      { height: 60, width: 30, promptBeforeOpen: false },
      (result) => {
        if (result.status === Office.AsyncResultStatus.Failed) {
          console.error("Failed to open logout dialog:", result.error.message);
        } else {
          const dialog = result.value;

          // Listen for messages from the logout dialog
          dialog.addEventHandler(Office.EventType.DialogMessageReceived, async (arg) => {
            const message = JSON.parse(arg.message);
            console.log(message);
            if (message.action === "SUCCESS") {
              const resp = await xpayCreditsVerify(intent_id);
              if (!resp.success) {
                failureToast("Payment failed", dispatchToast);
                dialog.close();
                return;
              }
              authDispatch({ type: "UPDATE_USER", payload: { ...user, credits: credits + user.credits } });
              successToast("Payment successful credits added", dispatchToast);
              await refreshState();
            } else {
              failureToast("Payment failed", dispatchToast);
            }
            dialog.close();
          });
        }
      }
    );
  }
}
