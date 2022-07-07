import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import GroupList from "../../components/GroupList";

const Dashboard = () =>
{
  const [infoGroups, setGroups] = useState();
  const getAllGroups = () =>
  {
    const readGroups = async () => (void setGroups(await sp.web.siteGroups.get()));
    readGroups();
  };
  useEffect(getAllGroups, []);
  return (<div className="div--columns" style={{ maxHeight: "85vh" }}>
    <section className="flex-basis--25pct">
      <GroupList groups={infoGroups} />
    </section>
    <section className="flex-basis--75pct">
      <div className="display--flex" style={{ height: "100%", textAlign: "center" }}>
        Select a group on the left to view its information here.
      </div>
    </section>
  </div>);
};
Dashboard.displayName = "Dashboard";

export default Dashboard;
