import { useContext } from "react";
import * as FluentUI from "@fluentui/react";
import GroupContext from "../../contexts/GroupContext";

const GroupFormFields = () =>
{
  const { group } = useContext(GroupContext);
  return (<>
    <div className="div--group-form__row">
      <div className="div--group-form__item">
        <label htmlFor="Title">Title:</label>
        <FluentUI.TextField id="Title" value={group.Title} />
      </div>
      <div className="div--group-form__item">
        <label htmlFor="Description">Description:</label>
        <FluentUI.TextField id="Description" multiline={true} rows={4} value={group.Description} />
      </div>
    </div>
  </>);
};
GroupFormFields.displayName = "GroupFormFields";

export default GroupFormFields;
