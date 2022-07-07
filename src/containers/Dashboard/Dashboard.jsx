import { useEffect, useState } from "react";
import { sp } from "@pnp/sp";
import GroupForm from "../GroupForm";
import GroupList from "../../components/GroupList";

const Dashboard = () =>
{
  const [groupSelected, setGroupSelected] = useState(null);
  const [infoGroups, setGroups] = useState();
  const getAllGroups = () =>
  {
    const readGroups = async () => (void setGroups(await sp.web.siteGroups.get()));
    readGroups();
  };
  useEffect(getAllGroups, []);
  const onSelect = (item) =>
  {
    const groupMatched = infoGroups.filter((existing) => (existing.Id === item.Id))[0];
    setGroupSelected(groupMatched);
  };
  return (<div className="div--columns" style={{ maxHeight: "85vh" }}>
    <section className="flex-basis--25pct">
      <GroupList groups={infoGroups} onActiveItemChanged={onSelect} />
    </section>
    <section className="flex-basis--75pct">
      <GroupForm group={groupSelected} />
    </section>
  </div>);
};
Dashboard.displayName = "Dashboard";

export default Dashboard;
