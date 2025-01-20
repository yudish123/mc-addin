import { config } from "../../env";

export const createSubscription = async (plan_id, email, name, token, isInr) => {
  try {
    const baseurl = isInr ? config.paymentApi + "/payment" : config.paymentApi + "/xpay";
    const res = await fetch(`${baseurl}/subscription/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        plan_id,
        billing_email: email,
        billing_name: name,
      }),
    });

    const resp = await res.json();

    if (!resp.success) {
      return { success: false, error: resp.error };
    }

    return { success: true, subscription_link: resp.subscription_link, subscription_id: resp.subscription_id };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const verifyPayment = async (token, sub_id, sig, pay_id) => {
  try {
    const res = await fetch(`${config.paymentApi}/payment/verify/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        razorpay_payment_id: pay_id,
        razorpay_signature: sig,
        razorpay_subscription_id: sub_id,
      }),
    });

    const resp = await res.json();

    if (!resp.success) {
      return { success: false, error: resp.error };
    }

    return { success: true, resp };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const cancelSubscription = async (token, isInr) => {
  try {
    const baseurl = isInr ? config.paymentApi + "/payment" : config.paymentApi + "/xpay";
    const res = await fetch(`${baseurl}/subscription/cancel/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const resp = await res.json();

    if (!resp.success) {
      return { success: false, error: resp.error };
    }

    return resp;
  } catch (error) {
    console.log(error);
  }
};

export const upgradeSubscription = async (token, plan_id) => {
  try {
    const res = await fetch(`${config.paymentApi}/payment/subscription/upgrade/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        plan_id,
      }),
    });

    const resp = await res.json();

    if (!resp.success) {
      return { success: false, error: resp.error };
    }

    return resp;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const pauseSubscription = async (token) => {
  try {
    const res = await fetch(`${config.paymentApi}/payment/subscription/pause/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resp = await res.json();
    if (!resp.success) {
      return { success: false, error: resp.error };
    }
    return resp;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const resumeSubscription = async (token) => {
  try {
    const res = await fetch(`${config.paymentApi}/payment/subscription/resume/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resp = await res.json();
    if (!resp.success) {
      return { success: false, error: resp.error };
    }
    return resp;
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};

export const getSubscriptionDataApi = async (token) => {
  try {
    const res = await fetch(`${config.paymentApi}/payment/subscription/data/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error || "Failed to fetch data" };
    }

    const resp = await res.json();

    if (!resp.success) {
      return { success: false, error: resp.error };
    }

    return { success: true, data: resp.data };
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};

export const changeSubscriptionApi = async (token, plan_id, billing_email, billing_name, isInr) => {
  try {
    const base_url = isInr ? config.paymentApi + "/payment" : config.paymentApi + "/xpay";
    const res = await fetch(`${base_url}/subscription/upgrade/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ plan_id, billing_email, billing_name }),
    });
    if (!res.ok) {
      const errorData = await res.json();
      return { success: false, error: errorData.error || "Failed to update plan" };
    }

    const resp = await res.json();

    if (!resp.success) {
      return { success: false, error: resp.error };
    }
    if (isInr) {
      return { success: true, data: resp.data };
    }
    return { success: true, subscription_link: resp.subscription_link, subscription_id: resp.subscription_id };
  } catch (error) {
    console.error("Error updating plan:", error);
    return { success: false, error: "Something went wrong. Please try again." };
  }
};

export const verifyCreditsPayment = async (token, payment_id) => {
  try {
    console.log(token, payment_id);
    const res = await fetch(`${config.paymentApi}/payment/credits/verify/${payment_id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    const resp = await res.json();
    if (!resp.success) {
      return { success: false, error: resp.error };
    }
    return { success: true, data: resp.data };
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    console.log(error);
  }
};

export const createCreditPaymentIntent = async (credits, token) => {
  try {
    const res = await fetch(`${config.paymentApi}/xpay/credits/payment/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        credits,
      }),
    });
    const resp = await res.json();
    if (!resp.success) {
      return { success: false, error: resp.error };
    }
    return { success: true, data: resp.xIntentId };
  } catch (error) {
    console.error("Error fetching subscription data:", error);
    return { success: false, error };
  }
};

export const xpayCreditsVerify = async (intent_id) => {
  try {
    const res = await fetch(`${config.paymentApi}/xpay/credits/verify/${intent_id}/`, {
      method: "POST",
    });
    const resp = await res.json();
    if (!resp.success) {
      return { success: false, error: resp.error };
    }
    return { success: true, data: resp.data };
  } catch (error) {
    console.log(error);
    return { success: false, error };
  }
};
