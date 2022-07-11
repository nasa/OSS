import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import "@pnp/polyfill-ie11";
import { initializeIcons } from "@fluentui/react";
import { sp } from "@pnp/sp";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import "./index.css";
import App from "./App";
import i18n from "./i18n";
import reportWebVitals from "./reportWebVitals";

initializeIcons();
sp.setup({
  ie11: true,
  sp: { baseUrl: process.env.REACT_APP_WEB_REL_URL }
});
ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
