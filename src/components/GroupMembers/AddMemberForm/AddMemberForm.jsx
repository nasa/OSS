import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import PeoplePicker from "../../PeoplePicker";
import GroupContext from "../../../contexts/GroupContext";
import { DefaultButton } from "@fluentui/react";

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
