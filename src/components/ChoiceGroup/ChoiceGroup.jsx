import * as FluentUI from "@fluentui/react";

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
