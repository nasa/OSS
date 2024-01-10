import { useCallback, useContext, useEffect, useState } from "react";
import { Icon, PrimaryButton } from "@fluentui/react";
import { sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";
import GroupForm from "../GroupForm";
import GroupList from "../../components/GroupList";
import AppContext from "../../contexts/AppContext";

/**
 * Display the overall structure of the functional portion of the Group Management app: the list of groups on the
 * left-hand side and the group form on the right-hand side.
 *
 * @component
 * @public
 * @returns {JSX} The overall structure and greater components of the functional portion of the Group Management app.
 */
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
  const refresh = useCallback(getAllGroups, [setGroups, setGroupSelected]);
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
  return (<div className="div--columns" style={{ maxHeight: "calc(100vh - 2.5em)", minHeight: "calc(95vh - 2em)" }}>
    <section className="dashboard__list">
      <GroupList groups={infoGroups} onSelect={onSelect} />
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
      <GroupForm group={groupSelected} refresh={refresh} web={web} />
    </section>
  </div>);
};
Dashboard.displayName = "Dashboard";

export default Dashboard;
