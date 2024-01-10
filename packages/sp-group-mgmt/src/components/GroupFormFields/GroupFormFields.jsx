import { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ChoiceGroup from "../ChoiceGroup";
import PeoplePicker from "../PeoplePicker";
import TextField from "../TextField";
import GroupContext from "../../contexts/GroupContext";

/**
 * Display a form that allows the user to review and update the group metadata. This includes:
 *  - the name of the group,
 *  - the description of the group,
 *  - the owner of the group,
 *  - who can see the membership of the group,
 *  - who can edit the membership of the group,
 *  - whether the group allows users to request to join or leave the group, and
 *  - whether such join and leave requests should be accepted automatically.
 *
 * @component
 * @public
 * @returns {JSX} The UI for the user to update the group metadata.
 */
const GroupFormFields = () =>
{
  const { group, onChange, validation, web } = useContext(GroupContext);
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
  const getErrorMessage = useCallback(
    (nameField) => (validation?.[nameField] ? t(`GroupForm.errors.${validation?.[nameField]}`) : ""),
    [validation]
  );
  const handleChange = useCallback(
    (nameField) => (valueNew) => (void onChange?.({ Id: group.Id, [nameField]: valueNew })),
    [onChange]
  );
  return (<>
    <div className="div--group-form__row">
      <div className="div--group-form__item">
        <TextField
          errorMessage={getErrorMessage("Title")}
          fieldName="Title"
          key={`Title__${group.Id}`}
          label={t("GroupForm.labels.Title")}
          onChange={handleChange("Title")}
          required={true}
          value={group.Title} />
      </div>
      <div className="div--group-form__item">
        <TextField
          errorMessage={getErrorMessage("Description")}
          fieldName="Description"
          key={`Description__${group.Id}`}
          label={t("GroupForm.labels.Description")}
          multiline={true}
          onChange={handleChange("Description")}
          rows={4}
          value={group.Description} />
      </div>
      <div className="div--group-form__item">
        <PeoplePicker
          allowGroups={true}
          allowMultiple={false}
          errorMessage={getErrorMessage("OwnerTitle")}
          fieldName="OwnerTitle"
          key={`OwnerTitle__${group.Id}`}
          label={t("GroupForm.labels.OwnerTitle")}
          onChange={handleChange("OwnerTitle")}
          required={true}
          value={group.OwnerTitle}
          webUrl={web.Url} />
      </div>
      <div className="div--group-form__item">
        <ChoiceGroup
          errorMessage={getErrorMessage("OnlyAllowMembersViewMembership")}
          label={t("GroupForm.labels.OnlyAllowMembersViewMembership")}
          key={`OnlyAllowMembersViewMembership__${group.Id}`}
          onChange={handleChange("OnlyAllowMembersViewMembership")}
          options={choicesViewMembership}
          required={true}
          value={group.OnlyAllowMembersViewMembership} />
      </div>
      <div className="div--group-form__item">
        <ChoiceGroup
          errorMessage={getErrorMessage("AllowMembersEditMembership")}
          label={t("GroupForm.labels.AllowMembersEditMembership")}
          key={`AllowMembersEditMembership__${group.Id}`}
          onChange={handleChange("AllowMembersEditMembership")}
          options={choicesEditMembership}
          required={true}
          value={group.AllowMembersEditMembership} />
      </div>
      <div className="div--group-form__item">
        <ChoiceGroup
          errorMessage={getErrorMessage("AllowRequestToJoinLeave")}
          label={t("GroupForm.labels.AllowRequestToJoinLeave")}
          key={`AllowRequestToJoinLeave__${group.Id}`}
          onChange={handleChange("AllowRequestToJoinLeave")}
          options={choicesYesNo}
          required={true}
          value={group.AllowRequestToJoinLeave} />
      </div>
      <div className="div--group-form__item" style={{ display: group.AllowRequestToJoinLeave ? "" : "none" }}>
        <ChoiceGroup
          errorMessage={getErrorMessage("AutoAcceptRequestToJoinLeave")}
          label={t("GroupForm.labels.AutoAcceptRequestToJoinLeave")}
          key={`AutoAcceptRequestToJoinLeave__${group.Id}`}
          onChange={handleChange("AutoAcceptRequestToJoinLeave")}
          options={choicesYesNo}
          required={true}
          value={group.AutoAcceptRequestToJoinLeave} />
      </div>
    </div>
  </>);
};
GroupFormFields.displayName = "GroupFormFields";

export default GroupFormFields;
