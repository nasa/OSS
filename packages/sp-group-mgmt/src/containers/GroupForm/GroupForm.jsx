import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";
import GroupFormFields from "../../components/GroupFormFields";
import GroupMembers from "../../components/GroupMembers";
import GroupWriter from "../../components/GroupWriter";
import AppContext from "../../contexts/AppContext";
import GroupContext from "../../contexts/GroupContext";

/**
 * Display the overall structure for viewing and updating the group metadata and its membership along with buttons to
 * perform basic operations, such as creating a new group, deleting the specified group, saving changes to the specified
 * group, and reverting changes made on this form to the specified group.
 *
 * @component
 * @param {Group} group The group which form should be displayed.
 * @param {Function} refresh The function that is called when this group is updated or deleted and should refresh the
 *  group list and the metadata and membership of this group.
 * @param {SPWeb} web The PnpJS Web object used for interacting with the SharePoint Web API.
 * @public
 * @returns {JSX} The UI for viewing and updating the group metadata and membership.
 */
const GroupForm = ({ group: groupReceived = null, refresh, web } = {}) =>
{
  const { actions: { deleteGroup = true, updateGroup = true } } = useContext(AppContext);
  const { t } = useTranslation();
  const [disableDialog, setDisableDialog] = useState(false);
  const [groupEdit, setGroupEdit] = useState(groupReceived);
  const [hideDialog, setHideDialog] = useState(true);
  const refWriter = useRef();
  const [showErrors, setShowErrors] = useState(false);
  const dialogContentProps = useMemo(() => ({
    closeButtonAriaLabel: t("GroupForm.confirm.delete.cancel"),
    subText: t("GroupForm.confirm.delete.prompt", { name: groupEdit?.Title }),
    title: t("GroupForm.buttons.delete"),
    type: FluentUI.DialogType.normal
  }), [groupEdit?.Title, t]);
  const onChange = (groupNew) => (void setGroupEdit((groupOld) => ({ ...groupOld, ...groupNew })));
  const onClick_delete = () =>
  {
    const enableDialog = () => (void setDisableDialog(false));
    const resetForm = () => (void setGroupEdit(null));
    setDisableDialog(true);
    sp.web.siteGroups.removeById(groupEdit.Id).then(onDismiss_dialog).then(enableDialog).then(refresh).then(resetForm);
  };
  const onClick_save = () =>
  {
    const resetGroup = (groupUpdated) =>
    {
      const filterRemaining = (member) => (!member.__deleted);
      const mapExisting = (member) => ({ ...member, __created: false });
      setGroupEdit({
        ...groupUpdated,
        members: groupEdit.members.filter(filterRemaining).map(mapExisting),
        __loaded: new Date()
      });
    };
    setShowErrors(true);
    getIsValid() && refWriter.current.saveGroup().then(resetGroup).finally(refresh);
  };
  const onClick_undo = () => (void refresh?.());
  const onDismiss_dialog = () => (void setHideDialog(true));
  const onUpdate_groupReceived = () =>
  {
    const getGroupMembers = async () =>
    {
      const members = groupReceived?.Id ? await sp.web.siteGroups.getById(groupReceived.Id).users.get() : [];
      setGroupEdit({ ...groupReceived, members, __loaded: new Date() });
    };
    getGroupMembers();
    setShowErrors(false);
  };
  useEffect(onUpdate_groupReceived, [groupReceived, setGroupEdit, setShowErrors]);
  const getValidation = () =>
  {
    const isNotEmpty = (nameField) => () => ((groupEdit?.[nameField] || "").trim() !== "");
    const isNotNull = (nameField) => () => (groupEdit?.[nameField] != null);
    const reduceValidation = (result, { isValid, message, property }) =>
      ({ ...(isValid() ? {} : { [property]: message }), ...result });
    const conditions = [
      { isValid: isNotEmpty("Title"), message: "missingTitle", property: "Title" },
      { isValid: isNotNull("OwnerTitle"), message: "missingOwnerTitle", property: "OwnerTitle" },
      {
        isValid: isNotNull("OnlyAllowMembersViewMembership"),
        message: "missingViewMembership",
        property: "OnlyAllowMembersViewMembership"
      },
      {
        isValid: isNotNull("AllowMembersEditMembership"),
        message: "missingEditMembership",
        property: "AllowMembersEditMembership"
      },
      {
        isValid: isNotNull("AllowRequestToJoinLeave"),
        message: "missingJoinLeave",
        property: "AllowRequestToJoinLeave"
      },
      {
        isValid: () => (!groupEdit?.AllowRequestToJoinLeave || isNotNull("AutoAcceptRequestToJoinLeave")()),
        message: "missingAutoAccept",
        property: "AutoAcceptRequestToJoinLeave"
      }
    ];
    return conditions.reduce(reduceValidation, {});
  };
  const validation = useMemo(getValidation, [groupEdit]);
  const getIsValid = useCallback(() => (Object.keys(validation).length === 0), [validation]);
  const renderValidation = () =>
  {
    const renderMessage = ([key, message]) => (<div key={`alert__${key}`}>{t(`GroupForm.errors.${message}`)}</div>);
    return (showErrors && !getIsValid())
      ? (<div className="alert alert--danger">{Object.entries(validation).map(renderMessage)}</div>)
      : (<></>);
  };
  return (<>
    {groupEdit?.Id != null
      ? (<>
        <div className="div--group-form justify--start">
          <GroupContext.Provider value={{ group: groupEdit, onChange, validation: showErrors ? validation : {}, web }}>
            {renderValidation()}
            <GroupFormFields key={`form__${groupEdit.__loaded.valueOf() || 0}`} />
            <GroupMembers key={`members__${groupEdit.__loaded.valueOf() || 0}`} />
            <GroupWriter group={groupEdit} ref={refWriter} />
            <FluentUI.Dialog dialogContentProps={dialogContentProps} hidden={hideDialog} onDismiss={onDismiss_dialog}>
              <FluentUI.DialogFooter>
                <FluentUI.PrimaryButton
                  disabled={disableDialog}
                  onClick={onClick_delete}
                  text={t("GroupForm.confirm.delete.confirm")} />
                <FluentUI.DefaultButton
                  disabled={disableDialog}
                  onClick={onDismiss_dialog}
                  text={t("GroupForm.confirm.delete.cancel")} />
              </FluentUI.DialogFooter>
            </FluentUI.Dialog>
          </GroupContext.Provider>
        </div>
        <div style={{ marginTop: "1rem", textAlign: "right", width: "100%" }}>
          {
            (deleteGroup && (groupEdit?.Id > 0))
              ? (
                <FluentUI.ActionButton
                  className="background--redDark border--redDark"
                  onClick={() => (void setHideDialog(false))}
                  style={{ height: "32px", marginRight: "2rem" }}
                  text={t("GroupForm.buttons.delete")} />
                )
              : (<></>)
          }
          {
            updateGroup
              ? (<>
                <FluentUI.PrimaryButton text={t("GroupForm.buttons.save")} onClick={onClick_save} />
                <FluentUI.DefaultButton text={t("GroupForm.buttons.cancel")} onClick={onClick_undo} />
              </>)
              : (<></>)
          }
        </div>
      </>)
      : (<div className="div--group-form justify--center">
        <div style={{ textAlign: "center" }}>{t("GroupForm.placeholder")}</div>
      </div>)
    }
  </>);
};
GroupForm.displayName = "GroupForm";

export default GroupForm;
