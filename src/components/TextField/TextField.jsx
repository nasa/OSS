import { useCallback } from "react";
import * as FluentUI from "@fluentui/react";

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
