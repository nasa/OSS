import { useEffect, useRef, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";
import GroupFormFields from "../../components/GroupFormFields";
import GroupContext from "../../contexts/GroupContext";
import GroupWriter from "../../components/GroupWriter";

const GroupForm = ({ group: groupReceived = null, refresh } = {}) =>
{
  const { t } = useTranslation();
  const [groupEdit, setGroupEdit] = useState(groupReceived);
  const refWriter = useRef();
  const [web, setWeb] = useState();
  const onMount = () =>
  {
    const getWeb = async () => (void setWeb(await sp.web.get()));
    getWeb();
  };
  useEffect(onMount, []);
  const onChange = (groupNew) => (void setGroupEdit((groupOld) => ({ ...groupOld, ...groupNew })));
  const onClick_save = () =>
  {
    const onSave_done = (groupSaved) => (void setGroupEdit({ ...groupSaved, __loaded: new Date() }));
    refWriter.current.saveGroup().then(onSave_done).then(refresh);
  };
  const onClick_undo = () => (void setGroupEdit({ ...groupReceived, __loaded: new Date() }));
  const onUpdate_groupReceived = () => (void setGroupEdit({ ...groupReceived, __loaded: new Date() }));
  useEffect(onUpdate_groupReceived, [groupReceived, setGroupEdit]);
  return (<>
    {groupEdit?.Id > 0
      ? (<div className="div--group-form justify--start">
          <GroupContext.Provider value={{ group: groupEdit, onChange, web }}>
            <h1 style={{ marginBottom: "0.5em" }}>
              <a
                href={`${web.Url}/_layouts/15/people.aspx?MembershipGroupId=${groupEdit.Id}`}
                rel="noreferrer"
                target="_blank">
                {groupReceived.Title}
                <FluentUI.Icon
                  iconName="OpenInNewWindow"
                  style={{ transform: "scale(0.75)", verticalAlign: "text-top" }} />
              </a>
            </h1>
            <GroupFormFields key={`form__${groupEdit.__loaded.valueOf() || 0}`} />
            <div className="div--group-form__row justify--end">
              <div className="div--group-form__item" style={{ textAlign: "right" }}>
                <FluentUI.PrimaryButton text={t("GroupForm.buttons.save")} onClick={onClick_save} />
                <FluentUI.DefaultButton text={t("GroupForm.buttons.cancel")} onClick={onClick_undo} />
              </div>
            </div>
            <GroupWriter group={groupEdit} ref={refWriter} />
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
