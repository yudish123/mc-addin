// supabaseRealtime.js
import { supabase } from "./client";

let channel;

// TODO: This is not secure for handling realtime updates
export const getRealtimeChannel = (user, dispatch) => {
  if (!channel) {
    channel = supabase
      .channel("accounts_credits_channel")
      .on("postgres_changes", { event: "*", schema: "public", table: "accounts" }, (payload) => {
        console.log(payload.new, "updates");
        if (user.credits !== payload.new.credits && payload.new.id === user.id) {
          user.credits = payload.new.credits;
          dispatch({
            type: "UPDATE_USER",
            payload: { ...user, credits: payload.new.credits },
          });
        }
        if (user.subscription_credits !== payload.new.subscription_credits && payload.new.id === user.id) {
          console.log(payload.new.subscription_credits);
          user.subscription_credits = payload.new.subscription_credits;
          dispatch({
            type: "UPDATE_USER",
            payload: { ...user, subscription_credits: payload.new.subscription_credits },
          });
        }
      })

      .subscribe();
  }
  console.log(channel);
  return channel;
};
