import { useContext, useEffect, useState } from "react";
import { Icon, PrimaryButton } from "@fluentui/react";
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
  const [web, setWeb] = useState();
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
  const onMount = () =>
  {
    const getWeb = async () => (void setWeb(await sp.web.get()));
    getWeb();
  };
  useEffect(onMount, []);
  const onSelect = (item) =>
  {
    const groupMatched = infoGroups.filter((existing) => (existing.Id === item.Id))[0];
    setGroupSelected(groupMatched);
  };
  return (<div className="div--columns" style={{ maxHeight: "95vh", minHeight: "85vh" }}>
    <section className="dashboard__list">
      <GroupList groups={infoGroups} onActiveItemChanged={onSelect} />
    </section>
    <section className="dashboard__form">
      <div className="dashboard__form__header">
        <h1>
          {
            groupSelected?.Id > 0
              ? (
              <a
                href={`${web.Url}/_layouts/15/people.aspx?MembershipGroupId=${groupSelected.Id}`}
                rel="noreferrer"
                target="_blank">
                {groupSelected?.Title}
                <Icon
                  iconName="OpenInNewWindow"
                  style={{ transform: "scale(0.75)", verticalAlign: "text-top" }} />
              </a>)
              : (<>{ groupSelected?.Id === 0 ? "[New Group]" : ""}</>)
          }
        </h1>
        {
          createGroup
            ? <PrimaryButton text={t("GroupForm.buttons.create")} onClick={onClick_createGroup} />
            : <></>
        }
      </div>
      <GroupForm group={groupSelected} refresh={getAllGroups} web={web} />
    </section>
  </div>);
};
Dashboard.displayName = "Dashboard";

export default Dashboard;
