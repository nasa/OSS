import { useContext, useEffect, useState } from "react";
import { PrimaryButton } from "@fluentui/react";
import { sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";
import GroupForm from "../GroupForm";
import GroupList from "../../components/GroupList";
import AppContext from "../../contexts/AppContext";

const Dashboard = () =>
{
  const { actions: { createGroup = true }, filters = {} } = useContext(AppContext);
  const [groupSelected, setGroupSelected] = useState(null);
  const [infoGroups, setGroups] = useState();
  const { t } = useTranslation();
  const getAllGroups = () =>
  {
    const readGroups = async () =>
    {
      const filterGroups = (result, [key, value]) =>
      {
        const filterGroup = (group) => ((typeof value === "function") ? value(group) : (group[key] === value));
        return result.filter(filterGroup);
      };
      const groupsRefreshed = Object.entries(filters).reduce(filterGroups, await sp.web.siteGroups.get());
      setGroups(groupsRefreshed);
      groupSelected?.Id && setGroupSelected(groupsRefreshed.filter(({ Id }) => (Id === groupSelected.Id))[0]);
    };
    readGroups();
  };
  useEffect(getAllGroups, []);
  const onClick_createGroup = async () => (void setGroupSelected({ Id: 0, members: [] }));
  const onSelect = (item) =>
  {
    const groupMatched = infoGroups.filter((existing) => (existing.Id === item.Id))[0];
    setGroupSelected(groupMatched);
  };
  return (<div className="div--columns" style={{ maxHeight: "95vh", minHeight: "85vh" }}>
    <section className="flex-basis--25pct">
      <GroupList groups={infoGroups} onActiveItemChanged={onSelect} />
    </section>
    <section className="flex-basis--75pct">
      <div style={{ paddingRight: "1rem", textAlign: "right" }}>
        {
          createGroup
            ? <PrimaryButton text={t("GroupForm.buttons.create")} onClick={onClick_createGroup} />
            : <></>
        }
      </div>
      <GroupForm group={groupSelected} refresh={getAllGroups} />
    </section>
  </div>);
};
Dashboard.displayName = "Dashboard";

export default Dashboard;
