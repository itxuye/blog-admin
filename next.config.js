require("dotenv").config();
const withLessExcludeAntd = require("./next-less.config.js")
const withTypescript = require("@zeit/next-typescript");
const Dotenv = require("dotenv-webpack");
const withLess = require("@zeit/next-less");
// const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");

// fix: prevents error when .less files are required by node
if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

module.exports = withTypescript(
  withLessExcludeAntd({
    webpack(config, options) {
      config.plugins = config.plugins || [];

      config.plugins = [
        ...config.plugins,

        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, `${process.env.NODE_ENV}.env`),
          systemvars: true
        })
      ];

      return config;
    },
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: "[local]___[hash:base64:5]",
    },
    lessLoaderOptions: {
      javascriptEnabled: true,
      // modifyVars: themeVariables // make your antd custom effective
    }
  })
);
