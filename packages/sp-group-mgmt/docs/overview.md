# Overview
The [App component](./App.md) is the primary component of this application. It provides the first level of structure for
the Group Management UI. That first level of structure is a header&mdash;containing the
[ThemePicker](./components/ThemePicker/ThemePicker.md) and the
[LanguagePicker](./components/LanguagePicker/LanguagePicker.md)&mdash;and the
[Dashboard](./containers/Dashboard/Dashboard.md).

## Dashboard
The Dashboard component provides the second level of structure for the Group Management UI. That second level of
structure includes the [GroupList](./components/GroupList/GroupList.md) on the left and the
[GroupForm](./containers/GroupForm/GroupForm.md) on the right.

## Group Form
The Group Form component provides the third level of structure for the Group Management UI. That third level of
structure has three horizontal layers: the [Group Metadata](./components/GroupFormFields/GroupFormFields.md); the
[Member List](./components/GroupMembers/GroupMembers.md); and buttons for deleting the group, saving changes to the
group, and reverting pending changes to the group.