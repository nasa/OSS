import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";

const Dashboard = () =>
{
  const [infoGroups, setGroups] = useState();
  const getAllGroups = () =>
  {
    const readGroups = async () => (void setGroups(await sp.web.siteGroups.get()));
    readGroups();
  };
  useEffect(getAllGroups, []);
  return (<>
    {Array.isArray(infoGroups) ? `Groups retrieved: ${infoGroups.length}` : (<div >Retrieving groups&hellip;</div>)}
  </>);
};
Dashboard.displayName = "Dashboard";

export default Dashboard;
