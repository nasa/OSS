import * as FluentUI from "@fluentui/react";

const ChoiceGroup = ({ label, onChange, options, value }) =>
{
  const handleChange = (_, choice) => (void onChange?.(choice.key));
  return (<fieldset>
    <legend>{label}</legend>
    <FluentUI.ChoiceGroup defaultSelectedKey={value} onChange={handleChange} options={options} />
  </fieldset>);
};
ChoiceGroup.displayName = "ChoiceGroup";

export default ChoiceGroup;
