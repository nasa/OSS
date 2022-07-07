import { useState } from "react";

const Dashboard = () =>
{
  const [infoGroups] = useState();
  return (<>
    { Array.isArray(infoGroups) ? `Groups retrieved: ${infoGroups.length}` : (<div >Retrieving groups&hellip;</div>)}
  </>);
};
Dashboard.displayName = "Dashboard";

export default Dashboard;
