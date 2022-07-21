import { useMemo, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "rooks";
import TextField from "../TextField";

const GroupList = ({ groups = [], onActiveItemChanged } = {}) =>
{
  const [searchText, setSearchText] = useState("");
  const setSearchTextDebounced = useDebounce(setSearchText, 500);
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
  const regexFilter = useMemo(
    () =>
    {
      let result = null;
      try
      {
        result = new RegExp(searchText, "i");
      }
      catch
      {}
      return result;
    },
    [searchText]
  );
  const filterGroup = ({ Id, Title }) =>
  {
    let result = false;
    if (/^\d+$/.test(searchText))
    {
      result = Id === parseInt(searchText);
    }
    else if (regexFilter != null)
    {
      result = regexFilter.test(Title);
    }
    else
    {
      result = ~Title.toLowerCase().indexOf(searchText.toLowerCase());
    }
    return result;
  };
  return (
    Array.isArray(groups)
      ? (<div style={{ height: "100%" }}>
        <div>
          <TextField
            prefix={(<FluentUI.Icon iconName="Search" />)}
            styles={{ field: { width: "inherit" } }}
            underlined
            onChange={setSearchTextDebounced} />
        </div>
        <div data-is-scrollable="true" style={{ maxHeight: "80vh", overflow: "hidden auto" }}>
          <FluentUI.DetailsList
            checkboxVisibility={FluentUI.CheckboxVisibility.hidden}
            columns={columns}
            compact={true}
            constrainMode={FluentUI.ConstrainMode.unconstrained}
            items={groups.filter(filterGroup)}
            layoutMode={FluentUI.DetailsListLayoutMode.justified}
            onActiveItemChanged={onActiveItemChanged}
            selectionMode={FluentUI.SelectionMode.single}
            setKey="Id" />
        </div>
      </div>)
      : <div className="display--flex" style={{ height: "100%" }}>
          <div style={{ textAlign: "center" }}>{t("GroupList.retrieving")}</div>
        </div>
  );
};
GroupList.displayName = "GroupList";

export default GroupList;
