# SharePoint Group Management Application

This application provides a more intuitive interface for interacting with SharePoint groups.

## Layout

 * [Contents](./docs/contents.md)

### Top

The application presents the user with a theme toggle and a localization select at the top of the screen.
 * The application queries the browser to identify whether the user prefers a light or dark theme and uses the theme
   theme indicated. The user can use the theme toggle to switch between light and dark themes.
 * The application queries the browser to identify the default language and will use that language if available. The
   user can use the localization select to switch to a different language.

### Left

The list of all SharePoint groups is shown on the left-hand side. At the top of the list is a filter box that accepts
plain text or regular expressions; when the value of the filter box changes, the application applies that text or
regular expression as a filter against the groups shown in the list.

When the user clicks a group in the list, the metadata and membership of that group is displayed on the right.

### Right

The right-hand side shows the information for the selected group. Just below the theme toggle and localization select,
the application also displays a button for creating a group.

The right-hand side first shows the metadata for the group: the name, the description, the owner, and the various
options. Below the metadata, the right-hand side shows the membership of the group. As with the group list, there is a
filter box at the top of the member list that accepts plain text or regular expressions; when the value of this filter
box changes, the application applies that text or regular expression as a filter against the members shown in the list.

When the user selects a user, the application shows that user&rsquo;s metadata to the right with an option to remove the
member from the group or, if the user has been removed (and the changes have not been saved), to restore the
user&rsquo;s membership. Below the member list, the application shows a button to add new members to the group; when
this button is clicked, the application presents the user with a people-picker and another button to confirm the
addition of the specified users to the group.

Below the metadata and the member list, the application shows buttons for deleting the group, saving changes to the
group, or reverting changes to the group. None of the changes made to the metadata or the membership of the group are
committed until the user clicks the button to save changes.

## History

This project was written in React and bootstrapped with Create-React-App. It has been deployed to several SharePoint
site collections&mdash;SharePoint 2013, SharePoint 2016, and SharePoint Online&mdash;as a tool to simplify management of
SharePoint groups.