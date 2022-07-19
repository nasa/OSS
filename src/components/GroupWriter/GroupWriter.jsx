import { ActionButton, Dialog, DialogType, Icon, Spinner, SpinnerSize } from "@fluentui/react";
import { sp } from "@pnp/sp";
import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const GroupWriter = forwardRef(({ group, members }, ref) =>
{
  const [status, setStatus] = useState("idle");
  const { t } = useTranslation();
  const icon = useMemo(() => ({
    idle: (<></>),
    pending: (<Spinner size={SpinnerSize.medium} />),
    rejected: (<Icon iconName="Cancel" style={{ color: "maroon" }} />),
    resolved: (<Icon iconName="CheckMark" style={{ color: "green" }} />)
  }[status]), [status]);
  const isButtonVisible = useMemo(() => (~["rejected", "resolved"].indexOf(status)), [status]);
  const message = useMemo(() => (t(`GroupWriter.${status}`)), [status, t]);
  const onClick_dismiss = () => (void setStatus("idle"));
  const saveGroup = async () =>
  {
    const forwardResult = (result) => () => ({ ...result, OwnerTitle: result.OwnerTitle.id });
    const onUpdate_done = () => (void setStatus("resolved"));
    const onUpdate_fail = () => (void setStatus("rejected"));
    const updateOwner = (groupUpdated) =>
    {
      const promise_updateOwner = (resolve, reject) =>
      {
        const getOwner = ({ spContext, spWeb }) =>
        {
          const promise_getOwner = (resolve, reject) =>
          {
            const getOwner_done = () => (void resolve(spOwner));
            let spOwner;
            if (group.OwnerTitle.EntityData.SPGroupID)
            {
              spOwner = spWeb.get_siteGroups().getById(group.OwnerTitle.EntityData.SPGroupID);
            }
            else
            {
              spOwner = spWeb.get_siteUsers().getById(group.OwnerTitle.EntityData.SPUserID);
            }
            spContext.load(spOwner);
            spContext.executeQueryAsync(getOwner_done, reject);
          };
          return new Promise(promise_getOwner);
        };
        const setOwner = ({ spContext, spGroup }) => (spOwner) =>
        {
          spGroup.set_owner(spOwner);
          spGroup.update();
          spContext.load(spGroup);
          spContext.executeQueryAsync(resolve, reject);
        };
        const csom = { spContext: window.SP.ClientContext.get_current() };
        csom.spWeb = csom.spContext.get_web();
        csom.spGroup = csom.spWeb.get_siteGroups().getById(groupUpdated.Id);
        return getOwner(csom).then(setOwner(csom)).then(resolve).catch(reject);
      };
      return new Promise(promise_updateOwner);
    };
    const writeGroup = async () =>
    {
      const forwardRequest = ({ data }) => ({ ...group, ...data, OwnerTitle: group.OwnerTitle });
      const {
        AllowMembersEditMembership, AllowRequestToJoinLeave, AutoAcceptRequestToJoinLeave, Description, Id,
        OnlyAllowMembersViewMembership, Title
      } = group;
      const groupToWrite = {
        AllowMembersEditMembership,
        AllowRequestToJoinLeave,
        AutoAcceptRequestToJoinLeave,
        Description,
        Id,
        OnlyAllowMembersViewMembership,
        Title
      };
      return (groupToWrite.Id > 0)
        ? sp.web.siteGroups.getById(group.Id).update(groupToWrite).then(forwardRequest)
        : sp.web.siteGroups.add(groupToWrite).then(forwardRequest);
    };
    setStatus("pending");
    const groupUpdated = await writeGroup();
    return updateOwner(groupUpdated)
      .then(onUpdate_done)
      .then(forwardResult(groupUpdated))
      .catch(onUpdate_fail);
  };
  useImperativeHandle(ref, () => ({ saveGroup }));
  return (
    <Dialog
      dialogContentProps={{
        showCloseButton: false,
        title: t("GroupWriter.title"),
        type: DialogType.normal
      }}
      hidden={status === "idle"}
      modalProps={{ isBlocking: true }}>
      <div style={{ marginBottom: "1em" }}>
        <div style={{ display: "inline-block", marginRight: "1em" }}>{icon}</div>
        {message}
      </div>
      <div style={{ display: isButtonVisible ? "" : "none", textAlign: "right" }}>
        <ActionButton text={t("GroupWriter.dismiss")} onClick={onClick_dismiss} />
      </div>
    </Dialog>
  );
});
GroupWriter.displayName = "GroupWriter";

export default GroupWriter;
