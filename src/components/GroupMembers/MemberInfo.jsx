import { ActionButton } from "@fluentui/react";
import { useTranslation } from "react-i18next";

const MemberInfo = ({ member = null, onClick_remove, onClick_restore } = {}) =>
{
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
      <div style={{ textAlign: "right" }}>
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
