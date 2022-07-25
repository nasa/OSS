import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";
import GroupFormFields from "../../components/GroupFormFields";
import GroupMembers from "../../components/GroupMembers";
import GroupWriter from "../../components/GroupWriter";
import GroupContext from "../../contexts/GroupContext";

const GroupForm = ({ group: groupReceived = null, refresh } = {}) =>
{
  const { t } = useTranslation();
  const [disableDialog, setDisableDialog] = useState(false);
  const [groupEdit, setGroupEdit] = useState(groupReceived);
  const [hideDialog, setHideDialog] = useState(true);
  const refWriter = useRef();
  const [showErrors, setShowErrors] = useState(false);
  const [web, setWeb] = useState();
  const dialogContentProps = useMemo(() => ({
    closeButtonAriaLabel: t("GroupForm.confirm.delete.cancel"),
    subText: t("GroupForm.confirm.delete.prompt", { name: groupEdit?.Title }),
    title: t("GroupForm.buttons.delete"),
    type: FluentUI.DialogType.normal
  }), [groupEdit?.Title, t]);
  const onMount = () =>
  {
    const getWeb = async () => (void setWeb(await sp.web.get()));
    getWeb();
  };
  useEffect(onMount, []);
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
    getIsValid() && refWriter.current.saveGroup().then(resetGroup).then(refresh);
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
      ? (<div className="div--group-form justify--start">
          <GroupContext.Provider value={{ group: groupEdit, onChange, validation: showErrors ? validation : {}, web }}>
            <h1 style={{ marginBottom: "0.5em" }}>{
              groupEdit.Id > 0
                ? (
                <a
                  href={`${web.Url}/_layouts/15/people.aspx?MembershipGroupId=${groupEdit.Id}`}
                  rel="noreferrer"
                  target="_blank">
                  {groupReceived?.Title}
                  <FluentUI.Icon
                    iconName="OpenInNewWindow"
                    style={{ transform: "scale(0.75)", verticalAlign: "text-top" }} />
                </a>)
                : (<>[New Group]</>)
            }</h1>
            {renderValidation()}
            <GroupFormFields key={`form__${groupEdit.__loaded.valueOf() || 0}`} />
            <GroupMembers key={`members__${groupEdit.__loaded.valueOf() || 0}`} />
            <div style={{ textAlign: "right" }}>
              {
                groupEdit?.Id > 0
                  ? (
                    <FluentUI.ActionButton
                      className="background--redDark border--redDark"
                      onClick={() => (void setHideDialog(false))}
                      style={{ height: "32px", marginRight: "2rem" }}
                      text={t("GroupForm.buttons.delete")} />
                    )
                  : (<></>)
              }
              <FluentUI.PrimaryButton text={t("GroupForm.buttons.save")} onClick={onClick_save} />
              <FluentUI.DefaultButton text={t("GroupForm.buttons.cancel")} onClick={onClick_undo} />
            </div>
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
        </div>)
      : (<div className="div--group-form justify--center" style={{ height: "100%" }}>
        <div style={{ textAlign: "center" }}>{t("GroupForm.placeholder")}</div>
      </div>)
    }
  </>);
};
GroupForm.displayName = "GroupForm";

export default GroupForm;
