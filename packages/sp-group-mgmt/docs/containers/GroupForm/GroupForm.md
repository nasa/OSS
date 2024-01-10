<a name="GroupForm"></a>

## GroupForm(group, refresh, web) ⇒ <code>JSX</code>
Display the overall structure for viewing and updating the group metadata and its membership along with buttons toperform basic operations, such as creating a new group, deleting the specified group, saving changes to the specifiedgroup, and reverting changes made on this form to the specified group.

**Kind**: global function  
**Returns**: <code>JSX</code> - The UI for viewing and updating the group metadata and membership.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| group | <code>Group</code> | The group which form should be displayed. |
| refresh | <code>function</code> | The function that is called when this group is updated or deleted and should refresh the  group list and the metadata and membership of this group. |
| web | <code>SPWeb</code> | The PnpJS Web object used for interacting with the SharePoint Web API. |

