import "./App.css";
import Dashboard from "./containers/Dashboard";

const App = () =>
{
  return (
    <div className="App">
      <main>
        <div><Dashboard /></div>
      </main>
    </div>
  );
};
App.displayName = "App";

export default App;
