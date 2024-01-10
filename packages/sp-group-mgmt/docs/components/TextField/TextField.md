<a name="TextField"></a>

## TextField(fieldName, label, onChange, required, value) ⇒ <code>JSX</code>
This component is a wrapper for the[FluentUI TextField component](https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield),providing a label and a consistent onChange handler. Any properties not explicitly identified below will be passedthrough to the TextField component.

**Kind**: global function  
**Returns**: <code>JSX</code> - A TextField component wrapped with a label.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| fieldName | <code>string</code> | The HTML element id to use for the text field input. |
| label | <code>string</code> | The text to show as a label for the text field input. |
| onChange | <code>onChangeHandler</code> | The function to call when the user changes the value of the text field input. |
| required | <code>boolean</code> | Should this input be flagged as required? |
| value | <code>string</code> | The default value of this text field input. |

