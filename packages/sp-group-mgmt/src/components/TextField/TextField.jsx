import { useCallback } from "react";
import * as FluentUI from "@fluentui/react";

/**
 * This component is a wrapper for the
 * [FluentUI TextField component]{@link https://developer.microsoft.com/en-us/fluentui#/controls/web/textfield},
 * providing a label and a consistent onChange handler. Any properties not explicitly identified below will be passed
 * through to the TextField component.
 *
 * @component
 * @param {string} fieldName The HTML element id to use for the text field input.
 * @param {string} label The text to show as a label for the text field input.
 * @param {onChangeHandler} onChange The function to call when the user changes the value of the text field input.
 * @param {boolean} required Should this input be flagged as required?
 * @param {string} value The default value of this text field input.
 * @public
 * @returns {JSX} A TextField component wrapped with a label.
 */
const TextField = ({ fieldName, label, onChange, required, value, ...props }) =>
{
  const handleChange = useCallback((_, valueNew) => (void onChange?.(valueNew)), [onChange]);
  return (<>
    <label className={required ? "required" : ""} htmlFor={fieldName}>{label}</label>
    <FluentUI.TextField {...props} defaultValue={value} id={fieldName} onChange={handleChange} />
  </>);
};
TextField.displayName = "TextField";

export default TextField;
