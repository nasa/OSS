<a name="App"></a>

## App(actions, filters) ⇒ <code>JSX</code>
Get the Group Management application. This includes the[ThemePicker component](./components/ThemePicker/ThemePicker.md) and the[LanguagePicker component](./components/LanguagePicker/LanguagePicker.md) in the header section above the restof the app.

**Kind**: global function  
**Returns**: <code>JSX</code> - The Group Management application.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| actions | <code>Object</code> | What actions is the current user allowed to perform? |
| actions.addMember | <code>boolean</code> | Is the current user allowed to add members to a group? |
| actions.createGroup | <code>boolean</code> | Is the current user allowed to create groups? |
| actions.deleteGroup | <code>boolean</code> | Is the current user allowed to delete groups? |
| actions.removeMember | <code>boolean</code> | Is the current user allowed to remove members from a group? |
| actions.updateGroup | <code>boolean</code> | Is the current user allowed to updated groups? |
| filters | <code>Object</code> | What filters should be preemptively applied to the groups? This is a hashmap where each  property name matches the property name for a group; the value can be a string or a function. If a string, the  property value must be an exact match; for instance, if `filters.OwnerTitle` is provided, this instance of the  application will only allow the user to manage groups which OwnerTitle matches that value. If a function, the group  metadata will be passed to the function and the application will only allow the user to manage groups for which the  function returns a truthy value. |

