## Functions

<dl>
<dt><a href="#MemberInfo">MemberInfo(member, onClick_remove, onClick_restore)</a> ⇒ <code>JSX</code></dt>
<dd><p>Display the UI with metadata for the selected user. If the user is a current or prospective member of the group, this
UI includes a button to remove the user. If the user is slated to be removd from the group, this UI includes a button
to restore the user.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#onClick">onClick</a> ⇒ <code>void</code></dt>
<dd><p>This is the event handler for a click event.</p>
</dd>
<dt><a href="#User">User</a></dt>
<dd><p>This is an instance of an object with metadata for a user as retrieved from SharePoint.</p>
</dd>
</dl>

<a name="MemberInfo"></a>

## MemberInfo(member, onClick_remove, onClick_restore) ⇒ <code>JSX</code>
Display the UI with metadata for the selected user. If the user is a current or prospective member of the group, thisUI includes a button to remove the user. If the user is slated to be removd from the group, this UI includes a buttonto restore the user.

**Kind**: global function  
**Returns**: <code>JSX</code> - The UI for reviewing the selected user metadata with a button to remove or restore the user as a member of the current group.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| member | [<code>User</code>](#User) | The information about the user which information should be displayed. |
| onClick_remove | [<code>onClick</code>](#onClick) | The function to call when the user clicks the "Remove User" button. |
| onClick_restore | [<code>onClick</code>](#onClick) | The function to call when the user clicks the "Restore User" button. |

<a name="onClick"></a>

## onClick ⇒ <code>void</code>
This is the event handler for a click event.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | The event that ostensibly triggered this handler. |

<a name="User"></a>

## User
This is an instance of an object with metadata for a user as retrieved from SharePoint.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| Email | <code>string</code> | The email address associated with this user account. |
| Id | <code>number</code> | The numeric ID for this user account. |
| LoginName | <code>string</code> | The username for this user account. |
| PrincipalType | <code>number</code> | The  [PrincipalType enum](https://learn.microsoft.com/en-us/previous-versions/office/sharepoint-csom/ee541430(v=office.15))  value identifying the type of entity represented (i.e., user, distribution list, security group, SharePoint group). |
| Title | <code>string</code> | The display text used to identify this user account. |

