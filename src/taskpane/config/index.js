export const config = {
  plans: [
    {
      label: "pro-monthly",
      value: "plan_PV4oAma7zkfaQQ",
      count: 12,
      days: 30,
      credits: 10000,
    },
    {
      label: "pro-annual",
      value: "plan_PXoLVz1zCSLaSQ",
      count: 100,
      days: 365,
      credits: 10000,
    },
    {
      label: "starter-monthly",
      value: "plan_PXoLybUTcXgHw6",
      count: 100,
      days: 30,
      credits: 2500,
    },
    {
      label: "starter-annual",
      value: "plan_PXoMGkEvPitOyK",
      count: 12,
      days: 365,
      credits: 2500,
    },
  ],
  planMap: {
    "starter-monthly": {
      id: "plan_PXoLybUTcXgHw6",
      read_name: "Starter (monthly)",
    },
    "starter-annual": {
      id: "plan_PXoMGkEvPitOyK",
      read_name: "Starter (annual)",
    },
    "pro-monthly": {
      id: "plan_PV4oAma7zkfaQQ",
      read_name: "Pro (monthly)",
    },
    "pro-annual": {
      id: "plan_PXoLVz1zCSLaSQ",
      read_name: "Pro (annual)",
    },
    FREE: {
      read_name: "Free",
      id: "free",
    },
  },
};
