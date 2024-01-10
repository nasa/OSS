import { initializeIcons } from "@fluentui/react";
import { sp } from "@pnp/sp";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import App from "./App";
import i18n from "./i18n";
import reportWebVitals from "./reportWebVitals";

/**
 * To avoid the warning about initializing icons multiple times, we'll just initialize them here in the index file.
 */
initializeIcons();
sp.setup({
  ie11: false,
  sp: { baseUrl: process.env.REACT_APP_WEB_REL_URL }
});
/**
 * Another script on the page can restrict the actions a user can perform and the groups that a user can manage by
 * setting a global variable: `window.groupMgmt.options`. That variable, if set, is passed to the
 * [App component]{@link ./App.md} as its properties.
 *
 * @component Index
 * @public
 */
ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App {...(window?.groupMgmt?.options || {})} />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
