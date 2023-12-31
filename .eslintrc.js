module.exports = {
  env: {
    browser: true,
    es2015: true
  },
  extends: [
    "plugin:react/recommended",
    "standard"
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: [
    "react"
  ],
  rules: {
    "brace-style": ["error", "allman"],
    camelcase: ["error", { allow: ["^on", "^promise_", "_(done|fail|internal)$"], ignoreGlobals: true }],
    "no-prototype-builtins": "off",
    "no-var": "off",
    "no-void": "off",
    quotes: ["error", "double", { avoidEscape: true }],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    semi: ["error", "always"],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never"
      }
    ],
    "spaced-comment": ["error", "always", { markers: ["#"] }]
  }
};
