import * as React from "react";
import "normalize.css";
import { createRoot } from "react-dom/client";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import RouterComponent from "./components/Layout/Globals/Router.jsx";
import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "../env.js";
import * as Sentry from "@sentry/react";
/* global document, Office, module, require */

const appTheme = {
  ...webLightTheme,
  fontFamilyBase: '"Inter", serif',
  fontFamilyMonospace: '"Inter", serif;',
  fontFamilyNumeric: '"Inter", serif;',
};

const rootElement = document.getElementById("container");
const root = rootElement ? createRoot(rootElement) : undefined;

/* Render application after Office initializes */
Office.onReady(() => {
  root?.render(
    <Sentry.ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
      <Auth0Provider
        domain={config.auth0domain}
        clientId={config.auth0ClientId}
        authorizationParams={{
          redirect_uri: `${config.websiteDomain}/#/logininit`,
          audience: `https://${config.auth0domain}/api/v2/`,
          scope: "read:current_user update:current_user_metadata read:organizations",
        }}
      >
        <FluentProvider theme={appTheme}>
          <RouterComponent />
        </FluentProvider>
      </Auth0Provider>
    </Sentry.ErrorBoundary>
  );
});

if (module.hot) {
  module.hot.accept("./components/Layout/Globals/Router.jsx", () => {
    const NextApp = require("./components/Layout/Globals/Router.jsx").default;
    root?.render(
      <Sentry.ErrorBoundary fallback={<h1>Something went wrong.</h1>}>
        <Auth0Provider
          domain={config.auth0domain}
          clientId={config.auth0ClientId}
          authorizationParams={{
            redirect_uri: `${config.websiteDomain}/#/logininit`,
            audience: `https://${config.auth0domain}/api/v2/`,
            scope: "read:current_user update:current_user_metadata read:organizations",
          }}
        >
          <FluentProvider theme={appTheme}>
            <NextApp />
          </FluentProvider>
        </Auth0Provider>
      </Sentry.ErrorBoundary>
    );
  });
}
