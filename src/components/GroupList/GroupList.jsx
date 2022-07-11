import * as FluentUI from "@fluentui/react";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const GroupList = ({ groups = [], onActiveItemChanged } = {}) =>
{
  const { t } = useTranslation();
  const columns = useMemo(
    () => ([
      {
        fieldName: "Id",
        key: "Id",
        maxWidth: 9.6 * 5,
        minWidth: 7.2 * 5,
        name: t("GroupList.columns.Id")
      },
      {
        fieldName: "Title",
        key: "Title",
        maxWidth: 9.6 * 100,
        name: t("GroupList.columns.Title")
      }
    ]),
    [t]
  );
  return (
    Array.isArray(groups)
      ? (<div style={{ height: "100%" }}>
        <FluentUI.DetailsList
          checkboxVisibility={FluentUI.CheckboxVisibility.hidden}
          columns={columns}
          compact={true}
          constrainMode={FluentUI.ConstrainMode.unconstrained}
          data-is-scrollable={true}
          items={groups}
          layoutMode={FluentUI.DetailsListLayoutMode.justified}
          onActiveItemChanged={onActiveItemChanged}
          selectionMode={FluentUI.SelectionMode.single}
          setKey="Id" />
      </div>)
      : <div className="display--flex" style={{ height: "100%" }}>
          <div style={{ textAlign: "center" }}>{t("GroupList.retrieving")}</div>
        </div>
  );
};
GroupList.displayName = "GroupList";

export default GroupList;
