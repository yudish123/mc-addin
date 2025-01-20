const devCerts = require("office-addin-dev-certs");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CustomFunctionsMetadataPlugin = require("custom-functions-metadata-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const urlDev = "https://localhost:3000/";
const urlProd = "https://mindcase-addin-react.vercel.app/";

async function getHttpsOptions() {
  const httpsOptions = await devCerts.getHttpsServerOptions();
  return { ca: httpsOptions.ca, key: httpsOptions.key, cert: httpsOptions.cert };
}

module.exports = async (env, options) => {
  const dev = options.mode === "development";
  const config = {
    devtool: "source-map",
    entry: {
      polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
      vendor: ["react", "react-dom", "core-js", "@fluentui/react-components", "@fluentui/react-icons"],
      taskpane: [
        "./src/taskpane/taskpane.js",
        "./src/taskpane/index.jsx",
        "./src/taskpane/index.html",
        "./src/functions/functions.js",
      ],
      functions: "./src/functions/functions.js",
    },
    output: {
      clean: true,
      filename: "[name].bundle.js", // Ensure unique filenames for entry points
      path: path.resolve(__dirname, "dist"),
    },
    resolve: {
      extensions: [".html", ".js", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.html$/,
          exclude: /node_modules/,
          use: "html-loader",
        },
        {
          test: /\.(png|jpg|jpeg|gif|ico)$/,
          type: "asset/resource",
          generator: {
            filename: "assets/[name][ext][query]",
          },
        },
        {
          test: /\.css$/,
          use: [{ loader: "style-loader" }, { loader: "css-loader" }],
        },
      ],
    },
    plugins: [
      new CustomFunctionsMetadataPlugin({
        output: "functions.json",
        input: "./src/functions/functions.js",
      }),
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./src/taskpane/index.html",
        chunks: ["polyfill", "taskpane", "vendor"],
      }),
      new HtmlWebpackPlugin({
        filename: "pay.html",
        template: "./src/taskpane/pay.html",
        chunks: ["polyfill", "vendor"],
      }),
      new HtmlWebpackPlugin({
        filename: "xpay-callback.html",
        template: "./src/taskpane/xpay-callback.html",
        chunks: ["polyfill", "vendor"],
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "assets/*",
            to: "assets/[name][ext][query]",
          },
          {
            from: "manifest*.xml",
            to: "[name]" + "[ext]",
            transform(content) {
              return dev ? content : content.toString().replace(urlDev, urlProd);
            },
          },
          {
            from: "./stage-manifest.xml",
            to: "stage-manifest.xml",
          },
          {
            from: "./prod-manifest.xml",
            to: "prod-manifest.xml",
          },
        ],
      }),
      new webpack.ProvidePlugin({
        Promise: ["es6-promise", "Promise"],
      }),
    ],
    devServer: {
      hot: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "X-Frame-Options": "allowall",
        "Content-Security-Policy": "frame-ancestors *;",
      },
      server: {
        type: "https",
        options: env.WEBPACK_BUILD || options.https !== undefined ? options.https : await getHttpsOptions(),
      },
      port: process.env.npm_package_config_dev_server_port || 3000,
    },
  };

  return config;
};

