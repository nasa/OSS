import { useCallback, useMemo, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "rooks";
import TextField from "../TextField";

/**
 * This is an instance of a SharePoint group, reflecting the metadata retrieved from SharePoint and supplemented with a
 * `members` property that includes an array of User objects with information about the members of the group.
 *
 * @typedef Group
 * @property {boolean} AllowMembersEditMembership Are members of the group allowed to edit the membership of the group? If
 *  false, only the owner can edit membership of the group.
 * @property {boolean} AllowRequestToJoinLeave Are users allowed to request to join or leave this group?
 * @property {boolean} AutoAcceptRequestToJoinLeave Should SharePoint automatically accept requests to join or leave this
 *  group?
 * @property {string} Description The description of the group.
 * @property {boolean} OnlyAllowMembersViewMembership Are members of the group the only ones who can view membership of
 *  the group? If false, everyone can view membership of the group.
 * @property {string} OwnerTitle The display name of the owner of the group.
 * @property {string} Title The display name of the group.
 */

/**
 * This is a callback for when a user clicks an item in a list.
 *
 * @callback onSelect
 * @param {Group} item The group that was selected.
 */

/**
 * Display the group filter and list the filtered groups. The text in the filter input will be used to filter the
 * groups by their Title attribute (the display name). If the filter text can be used as a regular expression, groups
 * which Title is a match for the regular expression will be shown; otherwise, groups which Title contain the filter
 * text as a case-insensitive substring will be shown.
 *
 * @component
 * @param {Group[]} groups The groups that were retrieved from SharePoint.
 * @param {onSelect} onSelect The function to call when a user clicks on one of the groups in the group list.
 * @returns {JSX} The left-hand side of the application with a filter text box at the top and the rest of the space
 *  occupied by a [DetailsList]{@link https://developer.microsoft.com/en-us/fluentui#/controls/web/detailslist} showing
 *  the groups matching the filter.
 */
const GroupList = ({ groups = [], onSelect } = {}) =>
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
  const onClickRow = useCallback((item) => () => (void onSelect?.(item)), [onSelect]);
  const onRenderRow = (props) => (<FluentUI.DetailsRow onClick={onClickRow(props.item)} {...props} />);
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
        <div data-is-scrollable="true" style={{ maxHeight: "85vh", overflowX: "hidden", overflowY: "auto" }}>
          <FluentUI.DetailsList
            checkboxVisibility={FluentUI.CheckboxVisibility.hidden}
            columns={columns}
            compact={true}
            constrainMode={FluentUI.ConstrainMode.unconstrained}
            items={groups.filter(filterGroup)}
            layoutMode={FluentUI.DetailsListLayoutMode.justified}
            onRenderRow={onRenderRow}
            selectionMode={FluentUI.SelectionMode.single}
            setKey="Id" />
        </div>
      </div>)
      : <div className="display--flex">
          <div style={{ textAlign: "center" }}>{t("GroupList.retrieving")}</div>
        </div>
  );
};
GroupList.displayName = "GroupList";

export default GroupList;
