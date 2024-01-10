<a name="PeoplePicker"></a>

## PeoplePicker(allowGroups, allowMultiple, errorMessage, fieldName, label, onChange, required, value) ⇒ <code>JSX</code>
Display a people-picker with a label and error message and a standard onChange handler.

**Kind**: global function  
**Returns**: <code>JSX</code> - The UI for a people-picker with a standard onChange handler and error message display.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| allowGroups | <code>boolean</code> | Is the user allowed to pick groups? |
| allowMultiple | <code>boolean</code> | Is the user allowed to pick more than one entity? |
| errorMessage | <code>string</code> | The error message (if any) to display for this people-picker. |
| fieldName | <code>string</code> | The HTML element id for this people-picker. |
| label | <code>string</code> | The text to display for the label. |
| onChange | <code>onChange</code> | The function to call when the value of this people-picker changes. |
| required | <code>boolean</code> | Is this people-picker required to have a value? |
| value | <code>string</code> | The search text that will, when used to search SharePoint for an entity, will find the default  value as the first of the result set. (This allows for seamless use with the `OwnerTitle`.) |

