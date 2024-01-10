## Functions

<dl>
<dt><a href="#GroupList">GroupList(groups, onSelect)</a> ⇒ <code>JSX</code></dt>
<dd><p>Display the group filter and list the filtered groups. The text in the filter input will be used to filter the
groups by their Title attribute (the display name). If the filter text can be used as a regular expression, groups
which Title is a match for the regular expression will be shown; otherwise, groups which Title contain the filter
text as a case-insensitive substring will be shown.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Group">Group</a></dt>
<dd><p>This is an instance of a SharePoint group, reflecting the metadata retrieved from SharePoint and supplemented with a
<code>members</code> property that includes an array of User objects with information about the members of the group.</p>
</dd>
<dt><a href="#onSelect">onSelect</a> : <code>function</code></dt>
<dd><p>This is a callback for when a user clicks an item in a list.</p>
</dd>
</dl>

<a name="GroupList"></a>

## GroupList(groups, onSelect) ⇒ <code>JSX</code>
Display the group filter and list the filtered groups. The text in the filter input will be used to filter thegroups by their Title attribute (the display name). If the filter text can be used as a regular expression, groupswhich Title is a match for the regular expression will be shown; otherwise, groups which Title contain the filtertext as a case-insensitive substring will be shown.

**Kind**: global function  
**Returns**: <code>JSX</code> - The left-hand side of the application with a filter text box at the top and the rest of the space occupied by a [DetailsList](https://developer.microsoft.com/en-us/fluentui#/controls/web/detailslist) showing the groups matching the filter.  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| groups | [<code>Array.&lt;Group&gt;</code>](#Group) | The groups that were retrieved from SharePoint. |
| onSelect | [<code>onSelect</code>](#onSelect) | The function to call when a user clicks on one of the groups in the group list. |

<a name="Group"></a>

## Group
This is an instance of a SharePoint group, reflecting the metadata retrieved from SharePoint and supplemented with a`members` property that includes an array of User objects with information about the members of the group.

**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| AllowMembersEditMembership | <code>boolean</code> | Are members of the group allowed to edit the membership of the group? If  false, only the owner can edit membership of the group. |
| AllowRequestToJoinLeave | <code>boolean</code> | Are users allowed to request to join or leave this group? |
| AutoAcceptRequestToJoinLeave | <code>boolean</code> | Should SharePoint automatically accept requests to join or leave this  group? |
| Description | <code>string</code> | The description of the group. |
| OnlyAllowMembersViewMembership | <code>boolean</code> | Are members of the group the only ones who can view membership of  the group? If false, everyone can view membership of the group. |
| OwnerTitle | <code>string</code> | The display name of the owner of the group. |
| Title | <code>string</code> | The display name of the group. |

<a name="onSelect"></a>

## onSelect : <code>function</code>
This is a callback for when a user clicks an item in a list.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| item | [<code>Group</code>](#Group) | The group that was selected. |

