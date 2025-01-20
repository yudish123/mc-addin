import { createHashRouter } from "react-router-dom";
import React from "react";
import Functions from "../page/Functions";
import Header from "../components/Layout/Globals/Header";
import BugReport from "../page/BugReport";
import Pricing from "../page/Pricing";
import Chat from "../page/Chat";
import Billing from "../page/BillingInfo";
import Auth from "../page/Auth";
import Logout from "../page/Logout";
import Logoutcb from "../page/Logoutcb";
import Settings from "../page/Settings";
import Upload from "../page/Upload";
import Logininit from "../page/Logininit";
import Xpayinit from "../page/Xpayinit";

export const router = createHashRouter([
  {
    path: "/",
    element: <Header />, // Header as a layout for all child routes
    children: [
      { path: "/", element: <Functions /> },
      { path: "/upload-document", element: <Upload /> },
      { path: "/settings", element: <Settings /> },

      { path: "functions", element: <Functions /> },
      { path: "bug-report", element: <BugReport /> },
      { path: "pricing", element: <Pricing /> },
      { path: "chat", element: <Chat /> },
      { path: "billinginfo", element: <Billing /> },
    ],
  },
  { path: "/auth", element: <Auth /> },
  { path: "/logout", element: <Logoutcb /> },
  { path: "/logoutinit", element: <Logout /> },
  { path: "/logininit", element: <Logininit /> },
  { path: "/xpay-init", element: <Xpayinit /> },
]);
