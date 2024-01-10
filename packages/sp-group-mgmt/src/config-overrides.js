const reactAppRewirePostcss = require("react-app-rewire-postcss");
const postcssCustomProperties = require("postcss-custom-properties");

module.exports = (config) => (
  reactAppRewirePostcss(config, {
    plugins: () => [postcssCustomProperties({ importFrom: "./App.css" })]
  })
);
