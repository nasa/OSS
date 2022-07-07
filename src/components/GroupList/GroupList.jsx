import * as FluentUI from "@fluentui/react";
import { useMemo } from "react";

const GroupList = ({ groups = [], onActiveItemChanged } = {}) =>
{
  const columns = useMemo(
    () => ([
      {
        fieldName: "Id",
        key: "Id",
        maxWidth: 9.6 * 5,
        minWidth: 7.2 * 5,
        name: "ID"
      },
      {
        fieldName: "Title",
        key: "Title",
        maxWidth: 9.6 * 100,
        name: "Group Name"
      }
    ]),
    []
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
          <div style={{ textAlign: "center" }}>Retrieving groups&hellip;</div>
        </div>
  );
};
GroupList.displayName = "GroupList";

export default GroupList;
