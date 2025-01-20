// TODO: Check how can I use .evn in officejs excel addin till then
// this workaround for seperating out environment and building
// with env in docker/railway

const fs = require("fs");
require("dotenv").config();
const env = process.env.ENV || "local";
console.log(env);

const configs = {
  staging: {
    env: "STAGING",
    apiDomain: "https://mc-auth-service-staging.up.railway.app",
    websiteDomain: "https://mc-react-app-staging.up.railway.app",
    auth0ClientId: "oM6AiEek1fGz1Nfyv904EPjN6t7nevsW",
    auth0domain: "dev-xt6ytmpt.jp.auth0.com",
    BASE_URL: "https://mc-fastapi-app-staging.up.railway.app",
    paymentApi: "https://mc-payments-staging.up.railway.app",
  },
  production: {
    env: "PRODUCTION",
    apiDomain: "https://mc-auth-service-production.up.railway.app",
    websiteDomain: "https://mc-react-app-production.up.railway.app",
    auth0ClientId: "ty5SQDgc5e4kmcxcAxeR5RO7lHTJ7OaS",
    auth0domain: "mindcase.us.auth0.com",
    BASE_URL: "https://mc-fastapi-app-production.up.railway.app",
    paymentApi: "https://mc-payments-production.up.railway.app",
  },
  local: {
    env: "LOCAL",
    apiDomain: "https://mc-auth-dev-auth.up.railway.app",
    websiteDomain: "https://localhost:3000",
    auth0ClientId: "84tw951watZb7GUxHyy8JGdkNYnIP1WH",
    auth0domain: "dev-xt6ytmpt.jp.auth0.com",
    paymentApi: "https://mc-payments-staging.up.railway.app",
    BASE_URL: "https://mc-fastapi-app-staging.up.railway.app",
  },
};

const config = configs[env];

fs.writeFileSync("./src/env.js", `export const config = ${JSON.stringify(config, null, 2)};`, "utf8");

console.log(`Generated env.js for ${env}`);
