import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import PeoplePicker from "../../PeoplePicker";
import GroupContext from "../../../contexts/GroupContext";
import { DefaultButton } from "@fluentui/react";

/**
 * An object with metadata identifying a SharePoint group or user entity.
 *
 * @typedef EntityData
 * @property {number|undefined} SPGroupID The numeric ID of the SharePoint group (if the entity is a group).
 * @property {number|undefined} SPUserID The numeric ID of the SharePoint user (if the entity is a user).
 */

/**
 * An instance of a people-picker user or group selection.
 *
 * @typedef Persona
 * @property {EntityData} EntityData The metadata identifying this group or user entity.
 * @property {string} id The display name of this group or user.
 * @property {number} itemID The numeric ID of the group or user.
 * @property {string} primaryText The primary text used to identify this group or user in the people-picker control.
 * @property {string} secondaryText The secondary text used to identify this group or user in the people-picker control.
 *  For instance, this could be the job title for a selected user.
 * @property {string} tertiaryText The tertiary text used to identify this group or user in the people-picker control.
 *  For instance, this could be the email address for a selected user.
 */

/**
 * A callback function that receives an array of Personas representing users to add to the current group.
 *
 * @callback onAddMembers
 * @param {Persona[]} personas The users to add to the current group.
 * @returns {void}
 */

/**
 * Display the UI for the user to select users and add them as members to the current group.
 *
 * @component
 * @param {onAddMembers} onAddMembers The function to call when the user confirms adding new users to the group.
 * @public
 * @returns {JSX} The UI for a user to add new members to the current group.
 */
const AddMemberForm = ({ onAddMembers } = {}) =>
{
  const { t } = useTranslation();
  const { web } = useContext(GroupContext);
  const [membersNew, setMembersNew] = useState([]);
  const onChange_members = ({ results }) => (void setMembersNew(results));
  const onClick_submit = async () => (void onAddMembers?.(membersNew));
  return (<>
    <div style={{ textAlign: "left" }}>{t("GroupMembers.labels.New")}</div>
    <div style={{ marginBottom: "0.5em" }}>
      <PeoplePicker allowGroups={false} allowMultiple={true} webUrl={web.Url} onChange={onChange_members} />
    </div>
    <div style={{ textAlign: "right" }}>
      <DefaultButton text={t("GroupMembers.buttons.add")} onClick={onClick_submit} />
    </div>
  </>);
};
AddMemberForm.displayName = "AddMemberForm";

export default AddMemberForm;
