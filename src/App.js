import { useState } from "react";
import { ThemeProvider } from "@fluentui/react";
import Dashboard from "./containers/Dashboard";
import LanguagePicker from "./components/LanguagePicker/LanguagePicker";
import ThemePicker from "./components/ThemePicker";
import AppContext from "./contexts/AppContext";
import "./App.css";

const App = ({ actions = {}, filters = {} }) =>
{
  const [theme, setTheme] = useState({});
  return (
    <div className={`App theme--${theme.name}`}>
      <ThemeProvider applyTo="body" theme={theme}>
        <div className="div--columns justify--end" style={{ marginRight: "1rem" }}>
          <ThemePicker onChange={setTheme} theme={theme} />
          <LanguagePicker />
        </div>
        <main>
          <div>
            <AppContext.Provider value={{ actions, filters }}>
              <Dashboard />
            </AppContext.Provider>
          </div>
        </main>
      </ThemeProvider>
    </div>
  );
};
App.displayName = "App";

export default App;
