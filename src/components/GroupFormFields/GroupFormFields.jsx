import { useContext, useEffect, useMemo, useRef, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { Components } from "gd-sprest-react";
import { PrincipalSource, PrincipalType, sp } from "@pnp/sp";
import GroupContext from "../../contexts/GroupContext";

const GroupFormFields = () =>
{
  const { group, web } = useContext(GroupContext);
  const choicesEditMembership = useMemo(
    () => ([{ key: false, text: "Owner" }, { key: true, text: "Members of this group" }]),
    []
  );
  const choicesViewMembership = useMemo(
    () => ([{ key: false, text: "Everyone" }, { key: true, text: "Members of this group" }]),
    []
  );
  const choicesYesNo = useMemo(() => ([{ key: false, text: "No" }, { key: true, text: "Yes" }]), []);
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
        <label htmlFor="Title">Title:</label>
        <FluentUI.TextField id="Title" value={group.Title} />
      </div>
      <div className="div--group-form__item">
        <label htmlFor="Description">Description:</label>
        <FluentUI.TextField id="Description" multiline={true} rows={4} value={group.Description} />
      </div>
      <div className="div--group-form__item">
        <label htmlFor="Owner">Owner:</label>
        <Components.SPPeoplePicker
          allowGroups={true}
          allowMultiple={false}
          ref={refOwner}
          webUrl={web.Url} />
      </div>
    </div>
    <div className="div--group-form__row">
      <div className="div--group-form__item">
        <label>Who can view membership of this group?</label>
        <FluentUI.ChoiceGroup options={choicesViewMembership} selectedKey={group.OnlyAllowMembersViewMembership} />
      </div>
      <div className="div--group-form__item">
        <label>Who can edit membership of this group?</label>
        <FluentUI.ChoiceGroup options={choicesEditMembership} selectedKey={group.AllowMembersEditMembership} />
      </div>
      <div className="div--group-form__item">
        <label>Allow requests to join/leave the group?</label>
        <FluentUI.ChoiceGroup options={choicesYesNo} selectedKey={group.AllowRequestToJoinLeave} />
      </div>
      <div className="div--group-form__item" style={{ display: group.AllowRequestToJoinLeave ? "" : "none" }}>
        <label>Auto-accept requests to join/leave the group?</label>
        <FluentUI.ChoiceGroup options={choicesYesNo} selectedKey={group.AutoAcceptRequestToJoinLeave} />
      </div>
    </div>
  </>);
};
GroupFormFields.displayName = "GroupFormFields";

export default GroupFormFields;
