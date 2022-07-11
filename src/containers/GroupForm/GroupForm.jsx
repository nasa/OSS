import { useEffect, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";
import GroupFormFields from "../../components/GroupFormFields";
import GroupContext from "../../contexts/GroupContext";

const GroupForm = ({ group = null } = {}) =>
{
  const { t } = useTranslation();
  const [web, setWeb] = useState();
  const onMount = () =>
  {
    const getWeb = async () => (void setWeb(await sp.web.get()));
    getWeb();
  };
  useEffect(onMount, []);
  return (<>
    {group?.Id > 0
      ? (<div className="div--group-form justify--start">
          <GroupContext.Provider value={{ group, web }}>
            <h1 style={{ marginBottom: "0.5em" }}>
              <a
                href={`${web.Url}/_layouts/15/people.aspx?MembershipGroupId=${group.Id}`}
                rel="noreferrer"
                target="_blank">
                {group.Title}
                <FluentUI.Icon
                  iconName="OpenInNewWindow"
                  style={{ transform: "scale(0.75)", verticalAlign: "text-top" }} />
              </a>
            </h1>
            <GroupFormFields />
          </GroupContext.Provider>
        </div>)
      : (<div className="div--group-form justify--center" style={{ height: "100%" }}>
        <div style={{ textAlign: "center" }}>{t("GroupForm.placeholder")}</div>
      </div>)
    }
  </>);
};
GroupForm.displayName = "GroupForm";

export default GroupForm;
