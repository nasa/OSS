import { useState } from "react";
import { ThemeProvider } from "@fluentui/react-theme-provider";
import Dashboard from "./containers/Dashboard";
import ThemePicker from "./components/ThemePicker";
import "./App.css";

const App = () =>
{
  const [theme, setTheme] = useState({});
  return (
    <div className={`App theme--${theme.name}`}>
      <ThemeProvider applyTo="body" theme={theme}>
        <div className="div--columns justify--end" style={{ marginRight: "1em" }}>
          <ThemePicker onChange={setTheme} theme={theme} />
        </div>
        <main>
          <div><Dashboard /></div>
        </main>
      </ThemeProvider>
    </div>
  );
};
App.displayName = "App";

export default App;
