## Functions

<dl>
<dt><a href="#ChoiceGroup">ChoiceGroup(errorMessage, label, onChange, options, required, value)</a> ⇒ <code>JSX</code></dt>
<dd><p>Display a group of radio buttons in a fieldset with the provided label and error message. Any properties not
explicitly identified below are passed through to the internal
<a href="https://developer.microsoft.com/en-us/fluentui#/controls/web/choicegroup">FluentUI ChoiceGroup component</a>.</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#onChangeHandler">onChangeHandler</a> ⇒ <code>void</code></dt>
<dd><p>Handle changes to a user input.</p>
</dd>
<dt><a href="#Option">Option</a></dt>
<dd></dd>
</dl>

<a name="ChoiceGroup"></a>

## ChoiceGroup(errorMessage, label, onChange, options, required, value) ⇒ <code>JSX</code>
Display a group of radio buttons in a fieldset with the provided label and error message. Any properties notexplicitly identified below are passed through to the internal[FluentUI ChoiceGroup component](https://developer.microsoft.com/en-us/fluentui#/controls/web/choicegroup).

**Kind**: global function  
**Returns**: <code>JSX</code> - The display for this choice group with label, radio buttons, and error message.  
**Access**: public  
**Component**:   

| Param | Type | Description |
| --- | --- | --- |
| errorMessage | <code>JSX</code> \| <code>string</code> | The error message (if any) to display for this choice group. |
| label | <code>string</code> | The text to display as a legend for the fieldset containing the radio buttons. |
| onChange | [<code>onChangeHandler</code>](#onChangeHandler) | A function that will handle changes to the value of this choice group. |
| options | [<code>Array.&lt;Option&gt;</code>](#Option) | The options (key, text) to include in this choice group. |
| required | <code>boolean</code> | Is the user required to choose an option? |
| value | <code>string</code> | The key for the option selected by default. |

<a name="onChangeHandler"></a>

## onChangeHandler ⇒ <code>void</code>
Handle changes to a user input.

**Kind**: global typedef  

| Param | Type | Description |
| --- | --- | --- |
| valueNew | <code>string</code> | The key of the newly selected choice. |

<a name="Option"></a>

## Option
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| key | <code>string</code> | The internal value to use when specifying or selecting this option. |
| text | <code>string</code> | The text the user will use to identify and select this option. |

