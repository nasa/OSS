import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { Components } from "gd-sprest-react";
import { PrincipalSource, PrincipalType, sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";
import GroupContext from "../../contexts/GroupContext";

const GroupFormFields = () =>
{
  const { group, web } = useContext(GroupContext);
  const { t } = useTranslation();
  const choicesEditMembership = useMemo(
    () => ([
      { key: false, text: t("GroupForm.choicesEditMembership.false") },
      { key: true, text: t("GroupForm.choicesEditMembership.true") }
    ]),
    [t]
  );
  const choicesViewMembership = useMemo(
    () => ([
      { key: false, text: t("GroupForm.choicesViewMembership.false") },
      { key: true, text: t("GroupForm.choicesViewMembership.true") }
    ]),
    [t]
  );
  const choicesYesNo = useMemo(
    () => ([
      { key: false, text: t("GroupForm.choicesYesNo.false") },
      { key: true, text: t("GroupForm.choicesYesNo.true") }
    ]),
    [t]
  );
  const refOwner = useRef();
  const [valueOwner, setOwner] = useState([]);
  const onUpdate_groupOwner = () =>
  {
    const updateOwner = async () =>
    {
      const mapSearchResultToPersona = ({ DisplayText, EntityData: { SPGroupID, SPUserID }, Key }) =>
        ({ id: Key, itemID: SPGroupID || SPUserID, primaryText: DisplayText });
      const searchForOwner = () => (
        sp.profiles.clientPeoplePickerSearchUser({
          MaximumEntitySuggestions: 15,
          PrincipalSource: PrincipalSource.UserInfoList,
          PrincipalType: PrincipalType.All,
          QueryString: group.OwnerTitle
        })
      );
      setOwner((await searchForOwner()).map(mapSearchResultToPersona));
    };
    updateOwner();
  };
  useEffect(onUpdate_groupOwner, [group.OwnerTitle, setOwner]);
  const onUpdate_valueOwner = () => (void refOwner?.current?.onChange?.(valueOwner));
  useEffect(onUpdate_valueOwner, [refOwner, valueOwner]);
  return (<>
    <div className="div--group-form__row">
      <div className="div--group-form__item">
        <label htmlFor="Title">{t("GroupForm.labels.Title")}</label>
        <FluentUI.TextField id="Title" value={group.Title} />
      </div>
      <div className="div--group-form__item">
        <label htmlFor="Description">{t("GroupForm.labels.Description")}</label>
        <FluentUI.TextField id="Description" multiline={true} rows={4} value={group.Description} />
      </div>
      <div className="div--group-form__item">
        <label htmlFor="Owner">{t("GroupForm.labels.OwnerTitle")}</label>
        <Components.SPPeoplePicker allowGroups={true} allowMultiple={false} ref={refOwner} webUrl={web.Url} />
      </div>
    </div>
    <div className="div--group-form__row">
      <div className="div--group-form__item">
        <label>{t("GroupForm.labels.OnlyAllowMembersViewMembership")}</label>
        <FluentUI.ChoiceGroup options={choicesViewMembership} selectedKey={group.OnlyAllowMembersViewMembership} />
      </div>
      <div className="div--group-form__item">
        <label>{t("GroupForm.labels.AllowMembersEditMembership")}</label>
        <FluentUI.ChoiceGroup options={choicesEditMembership} selectedKey={group.AllowMembersEditMembership} />
      </div>
      <div className="div--group-form__item">
        <label>{t("GroupForm.labels.AllowRequestToJoinLeave")}</label>
        <FluentUI.ChoiceGroup options={choicesYesNo} selectedKey={group.AllowRequestToJoinLeave} />
      </div>
      <div className="div--group-form__item" style={{ display: group.AllowRequestToJoinLeave ? "" : "none" }}>
        <label>{t("GroupForm.labels.AutoAcceptRequestToJoinLeave")}</label>
        <FluentUI.ChoiceGroup options={choicesYesNo} selectedKey={group.AutoAcceptRequestToJoinLeave} />
      </div>
    </div>
  </>);
};
GroupFormFields.displayName = "GroupFormFields";

export default GroupFormFields;
