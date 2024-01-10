## Functions

<dl>
<dt><a href="#AddMemberForm">AddMemberForm(onAddMembers)</a> ⇒ <code>JSX</code></dt>
<dd><p>Display the UI for the user to select users and add them as members to the current group.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#EntityData">EntityData</a></dt>
<dd><p>An object with metadata identifying a SharePoint group or user entity.</p>
</dd>
<dt><a href="#Persona">Persona</a></dt>
<dd><p>An instance of a people-picker user or group selection.</p>
</dd>
<dt><a href="#onAddMembers">onAddMembers</a> ⇒ <code>void</code></dt>
<dd><p>A callback function that receives an array of Personas representing users to add to the current group.</p>
</dd>
</dl>

<a name="AddMemberForm"></a>

## AddMemberForm(onAddMembers) ⇒ <code>JSX</code>
Display the UI for the user to select users and add them as members to the current group.

**Kind**: global function  
**Returns**: <code>JSX</code> - The UI for a user to add new members to the current group.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| onAddMembers | [<code>onAddMembers</code>](#onAddMembers) | The function to call when the user confirms adding new users to the group. |

<a name="EntityData"></a>

## EntityData
An object with metadata identifying a SharePoint group or user entity.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| SPGroupID | <code>number</code> \| <code>undefined</code> | The numeric ID of the SharePoint group (if the entity is a group). |
| SPUserID | <code>number</code> \| <code>undefined</code> | The numeric ID of the SharePoint user (if the entity is a user). |

<a name="Persona"></a>

## Persona
An instance of a people-picker user or group selection.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| EntityData | [<code>EntityData</code>](#EntityData) | The metadata identifying this group or user entity. |
| id | <code>string</code> | The display name of this group or user. |
| itemID | <code>number</code> | The numeric ID of the group or user. |
| primaryText | <code>string</code> | The primary text used to identify this group or user in the people-picker control. |
| secondaryText | <code>string</code> | The secondary text used to identify this group or user in the people-picker control.  For instance, this could be the job title for a selected user. |
| tertiaryText | <code>string</code> | The tertiary text used to identify this group or user in the people-picker control.  For instance, this could be the email address for a selected user. |

<a name="onAddMembers"></a>

## onAddMembers ⇒ <code>void</code>
A callback function that receives an array of Personas representing users to add to the current group.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| personas | [<code>Array.&lt;Persona&gt;</code>](#Persona) | The users to add to the current group. |

