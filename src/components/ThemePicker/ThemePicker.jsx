import { useCallback, useEffect } from "react";
import { Icon, Toggle } from "@fluentui/react";
import { themes } from "./ThemePicker.constants";
import { getDefaultThemeName } from "./ThemePicker.helpers";

const ThemePicker = ({ onChange, theme }) =>
{
  const handleChange = useCallback((name) => (onChange?.({ ...themes[name], name })), [onChange]);
  const onMount = () => (void handleChange(getDefaultThemeName()));
  useEffect(onMount, [onChange]);
  const onChange_toggle = (_, isDark) => (void handleChange(isDark ? "dark" : "light"));
  return (
    <Toggle
      inlineLabel={true}
      label={<Icon iconName={theme?.name === "dark" ? "ClearNight" : "Sunny"} />}
      checked={theme?.name === "dark"}
      onChange={onChange_toggle} />
  );
};
ThemePicker.displayName = "ThemePicker";

export default ThemePicker;
