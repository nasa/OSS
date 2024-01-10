import { useState } from "react";
import { ThemeProvider } from "@fluentui/react";
import Dashboard from "./containers/Dashboard";
import LanguagePicker from "./components/LanguagePicker/LanguagePicker";
import ThemePicker from "./components/ThemePicker";
import AppContext from "./contexts/AppContext";
import "./App.css";

/**
 * Get the Group Management application. This includes the
 * [ThemePicker component]{@link ./components/ThemePicker/ThemePicker.md} and the
 * [LanguagePicker component]{@link ./components/LanguagePicker/LanguagePicker.md} in the header section above the rest
 * of the app.
 *
 * @component
 * @param {Object} actions What actions is the current user allowed to perform?
 * @param {boolean} actions.addMember Is the current user allowed to add members to a group?
 * @param {boolean} actions.createGroup Is the current user allowed to create groups?
 * @param {boolean} actions.deleteGroup Is the current user allowed to delete groups?
 * @param {boolean} actions.removeMember Is the current user allowed to remove members from a group?
 * @param {boolean} actions.updateGroup Is the current user allowed to updated groups?
 * @param {Object} filters What filters should be preemptively applied to the groups? This is a hashmap where each
 *  property name matches the property name for a group; the value can be a string or a function. If a string, the
 *  property value must be an exact match; for instance, if `filters.OwnerTitle` is provided, this instance of the
 *  application will only allow the user to manage groups which OwnerTitle matches that value. If a function, the group
 *  metadata will be passed to the function and the application will only allow the user to manage groups for which the
 *  function returns a truthy value.
 * @public
 * @returns {JSX} The Group Management application.
 */
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
