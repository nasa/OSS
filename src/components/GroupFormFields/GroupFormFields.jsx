import { useCallback, useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import ChoiceGroup from "./ChoiceGroup";
import PeoplePicker from "./PeoplePicker";
import TextField from "./TextField";
import GroupContext from "../../contexts/GroupContext";

const GroupFormFields = () =>
{
  const { group, onChange, web } = useContext(GroupContext);
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
  const handleChange = useCallback(
    (nameField) => (valueNew) => (void onChange?.({ Id: group.Id, [nameField]: valueNew })),
    [onChange]
  );
  return (<>
    <div className="div--group-form__row">
      <div className="div--group-form__item">
        <TextField
          fieldName="Title"
          key={`Title__${group.Id}`}
          label={t("GroupForm.labels.Title")}
          onChange={handleChange("Title")}
          value={group.Title} />
      </div>
      <div className="div--group-form__item">
        <TextField
          fieldName="Description"
          key={`Description__${group.Id}`}
          label={t("GroupForm.labels.Description")}
          onChange={handleChange("Description")}
          value={group.Description} />
      </div>
      <div className="div--group-form__item">
        <PeoplePicker
          allowGroups={true}
          allowMultiple={false}
          fieldName="OwnerTitle"
          key={`OwnerTitle__${group.Id}`}
          label={t("GroupForm.labels.OwnerTitle")}
          onChange={handleChange("OwnerTitle")}
          value={group.OwnerTitle}
          webUrl={web.Url} />
      </div>
    </div>
    <div className="div--group-form__row">
      <div className="div--group-form__item">
        <ChoiceGroup
          label={t("GroupForm.labels.OnlyAllowMembersViewMembership")}
          key={`OnlyAllowMembersViewMembership__${group.Id}`}
          onChange={handleChange("OnlyAllowMembersViewMembership")}
          options={choicesViewMembership}
          value={group.OnlyAllowMembersViewMembership} />
      </div>
      <div className="div--group-form__item">
        <ChoiceGroup
          label={t("GroupForm.labels.AllowMembersEditMembership")}
          key={`AllowMembersEditMembership__${group.Id}`}
          onChange={handleChange("AllowMembersEditMembership")}
          options={choicesEditMembership}
          value={group.AllowMembersEditMembership} />
      </div>
      <div className="div--group-form__item">
        <ChoiceGroup
          label={t("GroupForm.labels.AllowRequestToJoinLeave")}
          key={`AllowRequestToJoinLeave__${group.Id}`}
          onChange={handleChange("AllowRequestToJoinLeave")}
          options={choicesYesNo}
          value={group.AllowRequestToJoinLeave} />
      </div>
      <div className="div--group-form__item" style={{ display: group.AllowRequestToJoinLeave ? "" : "none" }}>
        <ChoiceGroup
          label={t("GroupForm.labels.AutoAcceptRequestToJoinLeave")}
          key={`AutoAcceptRequestToJoinLeave__${group.Id}`}
          onChange={handleChange("AutoAcceptRequestToJoinLeave")}
          options={choicesYesNo}
          value={group.AutoAcceptRequestToJoinLeave} />
      </div>
    </div>
  </>);
};
GroupFormFields.displayName = "GroupFormFields";

export default GroupFormFields;
