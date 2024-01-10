import { ActionButton } from "@fluentui/react";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import AppContext from "../../../contexts/AppContext";

/**
 * This is the event handler for a click event.
 *
 * @callback onClick
 * @param {Event} event The event that ostensibly triggered this handler.
 * @returns {void}
 */

/**
 * This is an instance of an object with metadata for a user as retrieved from SharePoint.
 *
 * @typedef User
 * @property {string} Email The email address associated with this user account.
 * @property {number} Id The numeric ID for this user account.
 * @property {string} LoginName The username for this user account.
 * @property {number} PrincipalType The
 *  [PrincipalType enum]{@link https://learn.microsoft.com/en-us/previous-versions/office/sharepoint-csom/ee541430(v=office.15)}
 *  value identifying the type of entity represented (i.e., user, distribution list, security group, SharePoint group).
 * @property {string} Title The display text used to identify this user account.
 */

/**
 * Display the UI with metadata for the selected user. If the user is a current or prospective member of the group, this
 * UI includes a button to remove the user. If the user is slated to be removd from the group, this UI includes a button
 * to restore the user.
 *
 * @component
 * @param {User} member The information about the user which information should be displayed.
 * @param {onClick} onClick_remove The function to call when the user clicks the "Remove User" button.
 * @param {onClick} onClick_restore The function to call when the user clicks the "Restore User" button.
 * @public
 * @returns {JSX} The UI for reviewing the selected user metadata with a button to remove or restore the user as a
 *  member of the current group.
 */
const MemberInfo = ({ member = null, onClick_remove, onClick_restore } = {}) =>
{
  const { actions: { removeMember = true } } = useContext(AppContext);
  const { t } = useTranslation();
  return (member != null)
    ? (<>
      <div className="div--group-form__item" style={{ textAlign: "left" }}>
        <div className="div--columns">
          <div className="flex-basis--25pct">{t("GroupMembers.labels.Title")}:</div>
          <div className="flex-basis--75pct">{member.Title}</div>
        </div>
        <div className="div--columns">
          <div className="flex-basis--25pct">{t("GroupMembers.labels.Email")}:</div>
          <div className="flex-basis--75pct">{member.Email}</div>
        </div>
        <div className="div--columns">
          <div className="flex-basis--25pct">{t("GroupMembers.labels.LoginName")}:</div>
          <div className="flex-basis--75pct">{member.LoginName}</div>
        </div>
      </div>
      <div style={{ display: removeMember ? "" : "none", textAlign: "right" }}>
        <ActionButton
          className="background--red"
          style={{ display: member.__deleted ? "none" : "", height: "32px" }}
          text={t("GroupMembers.buttons.remove")}
          onClick={onClick_remove} />
        <ActionButton
          className="background--green"
          style={{ display: member.__deleted ? "" : "none", height: "32px" }}
          text={t("GroupMembers.buttons.restore")}
          onClick={onClick_restore} />
      </div>
    </>)
    : (<></>);
};
MemberInfo.displayName = "MemberInfo";

export default MemberInfo;
