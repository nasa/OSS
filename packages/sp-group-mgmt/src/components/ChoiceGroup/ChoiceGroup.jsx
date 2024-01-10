import * as FluentUI from "@fluentui/react";

/**
 * Handle changes to a user input.
 *
 * @callback onChangeHandler
 * @param {string} valueNew The key of the newly selected choice.
 * @returns {void}
 */
/**
 * @typedef Option
 * @property {string} key The internal value to use when specifying or selecting this option.
 * @property {string} text The text the user will use to identify and select this option.
 */
/**
 * Display a group of radio buttons in a fieldset with the provided label and error message. Any properties not
 * explicitly identified below are passed through to the internal
 * [FluentUI ChoiceGroup component]{@link https://developer.microsoft.com/en-us/fluentui#/controls/web/choicegroup}.
 *
 * @component
 * @param {JSX|string} errorMessage The error message (if any) to display for this choice group.
 * @param {string} label The text to display as a legend for the fieldset containing the radio buttons.
 * @param {onChangeHandler} onChange A function that will handle changes to the value of this choice group.
 * @param {Option[]} options The options (key, text) to include in this choice group.
 * @param {boolean} required Is the user required to choose an option?
 * @param {string} value The key for the option selected by default.
 * @public
 * @returns {JSX} The display for this choice group with label, radio buttons, and error message.
 */
const ChoiceGroup = ({ errorMessage, label, onChange, options, required, value, ...props }) =>
{
  const handleChange = (_, choice) => (void onChange?.(choice.key));
  return (<fieldset>
    <legend className={required ? "required" : ""}>{label}</legend>
    <FluentUI.ChoiceGroup {...props} defaultSelectedKey={value} onChange={handleChange} options={options} />
    <div className="errorMessage" role="alert" style={{ display: errorMessage ? "" : "none" }}>{errorMessage}</div>
  </fieldset>);
};
ChoiceGroup.displayName = "ChoiceGroup";

export default ChoiceGroup;
