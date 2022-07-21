import { ActionButton } from "@fluentui/react";
import { useTranslation } from "react-i18next";

const MemberInfo = ({ member = null, onClick_remove, onClick_restore } = {}) =>
{
  const { t } = useTranslation();
  const bgColorRemove = "hsla(0, 100%, 50%, 0.25)";
  const bgColorRestore = "hsla(120, 100%, 50%, 0.25)";
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
          style={{ backgroundColor: bgColorRemove, display: member.__deleted ? "none" : "" }}
          text={t("GroupMembers.buttons.remove")}
          onClick={onClick_remove} />
        <ActionButton
          style={{ backgroundColor: bgColorRestore, display: member.__deleted ? "" : "none" }}
          text={t("GroupMembers.buttons.restore")}
          onClick={onClick_restore} />
      </div>
    </>)
    : (<></>);
};
MemberInfo.displayName = "MemberInfo";

export default MemberInfo;
