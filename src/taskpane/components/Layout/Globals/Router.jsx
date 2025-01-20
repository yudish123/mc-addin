import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "../../../router/index";
import AuthProvider from "../../../context/Authcontext";

const RouterComponent = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  );
};
export default RouterComponent;
