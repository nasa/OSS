import { useContext, useMemo, useState } from "react";
import * as FluentUI from "@fluentui/react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "rooks";
import AddMemberForm from "./AddMemberForm";
import MemberInfo from "./MemberInfo";
import TextField from "../TextField";
import GroupContext from "../../contexts/GroupContext";

const GroupMembers = () =>
{
  const { group, onChange } = useContext(GroupContext);
  const [searchText, setSearchText] = useState("");
  const setSearchTextDebounced = useDebounce(setSearchText, 500);
  const [selected, setSelected] = useState();
  const { t } = useTranslation();
  const columns = useMemo(
    () => ([
      {
        fieldName: "Title",
        key: "Title",
        maxWidth: 9.6 * 100,
        name: t("GroupMembers.columns.Title")
      }
    ]),
    []
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
  const filterMember = ({ Id, LoginName, Title }) =>
  {
    const testId = () => (/^\d+$/.test(searchText) && (Id === parseInt(searchText)));
    const testStringValue = (value) =>
    {
      let result = false;
      if (regexFilter != null)
      {
        result = regexFilter.test(value);
      }
      else
      {
        result = ~value.toLowerCase().indexOf(searchText.toLowerCase());
      }
      return result;
    };
    return testId() || Object.values({ LoginName, Title }).some(testStringValue);
  };
  const filterNotSelected = ({ LoginName }) => (LoginName !== selected.LoginName);
  const onActiveItemChanged = (item) =>
    (void setSelected(group.members.filter((member) => (member.Id === item.Id))[0]));
  const onClick_addMember = () => (void setSelected({ Id: 0 }));
  const onClick_removeMember = () =>
  {
    const membersRemaining = group.members.filter(filterNotSelected);
    const memberThis = selected.__created ? [] : [{ ...selected, __deleted: true }];
    onChange?.({ members: [...membersRemaining, ...memberThis].sort(sortByTitle) });
    setSelected();
  };
  const onClick_restoreMember = () =>
  {
    const membersRemaining = group.members.filter(filterNotSelected);
    const memberThis = [{ ...selected, __deleted: undefined }];
    onChange?.({ members: [...membersRemaining, ...memberThis].sort(sortByTitle) });
    setSelected();
  };
  const onRenderRow = ({ item, ...props }) =>
  {
    const bgColorCreated = "hsla(120, 100%, 50%, 0.25)";
    const bgColorDeleted = "hsla(0, 100%, 50%, 0.25)";
    const bgColorSelected = "hsla(0, 0%, 0%, 0.25)";
    let bgColorRow = "";
    if (item.Id === selected?.Id)
    {
      bgColorRow = bgColorSelected;
    }
    else if (item.__created)
    {
      bgColorRow = bgColorCreated;
    }
    else if (item.__deleted)
    {
      bgColorRow = bgColorDeleted;
    }
    const stylesThisRow = { root: { backgroundColor: bgColorRow } };
    return (<FluentUI.DetailsRow {...props} item={item} styles={stylesThisRow} />);
  };
  const onSubmit_addMembers = (membersNew) =>
  {
    const filterNewLogin = (loginsExisting) => (login) => (!~loginsExisting.indexOf(login));
    const filterNewMember = (loginsNew) => (member) => (~loginsNew.indexOf(mapId(member)));
    const mapId = ({ id, LoginName }) => (id || LoginName);
    const mapNewUser = ({ id, itemID, primaryText, tertiaryText }) => ({
      __created: true,
      Email: tertiaryText,
      Id: itemID,
      LoginName: id,
      Title: primaryText
    });
    const loginsExisting = group.members.map(mapId);
    const loginsNew = [...new Set(membersNew.map(mapId).filter(filterNewLogin(loginsExisting)))];
    const membersUpdated = [...group.members, ...membersNew.filter(filterNewMember(loginsNew)).map(mapNewUser)]
      .sort(sortByTitle);
    onChange({ members: membersUpdated });
    setSelected();
  };
  const sortByTitle = (left, right) => ((left.Title || "").localeCompare(right.Title || ""));
  return (<>
    <div className="div--group-form__row">
      <div className="div--group-form__item width--double" style={{ maxHeight: "25vh", overflowY: "auto" }}>
        <TextField
          prefix={t("GroupMembers.labels.Search")}
          styles={{ field: { width: "inherit" } }}
          underlined
          onChange={setSearchTextDebounced} />
        <FluentUI.DetailsList
          checkboxVisibility={FluentUI.CheckboxVisibility.hidden}
          columns={columns}
          compact={true}
          constrainMode={FluentUI.ConstrainMode.unconstrained}
          items={group.members.filter(filterMember)}
          layoutMode={FluentUI.DetailsListLayoutMode.justified}
          onActiveItemChanged={onActiveItemChanged}
          onRenderRow={onRenderRow}
          selectionMode={FluentUI.SelectionMode.single}
          setKey="Id" />
      </div>
      <div className="div--group-form__item width--double">
        {(
          selected?.Id === 0
            ? (<AddMemberForm onAddMembers={onSubmit_addMembers} />)
            : (
                <MemberInfo
                  member={selected}
                  onClick_remove={onClick_removeMember}
                  onClick_restore={onClick_restoreMember} />
              )
        )}
      </div>
    </div>
    <div className="div--group-form__row" style={{ display: selected?.Id === 0 ? "none" : "" }}>
      <div className="div--group-form__item width--double" style={{ textAlign: "right" }}>
        <FluentUI.ActionButton text={t("GroupMembers.buttons.add")} onClick={onClick_addMember} />
      </div>
    </div>
  </>);
};
GroupMembers.displayName = "GroupMembers";

export default GroupMembers;
