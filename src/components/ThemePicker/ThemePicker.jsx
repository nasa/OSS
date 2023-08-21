import { useCallback, useEffect, useMemo } from "react";
import { Icon, Toggle } from "@fluentui/react";
import { themes } from "./ThemePicker.constants";
import { getDefaultThemeName } from "./ThemePicker.helpers";
import { useTranslation } from "react-i18next";

const ThemePicker = ({ onChange, theme }) =>
{
  const { t } = useTranslation();
  const getIcon = () => (
    <Icon
      aria-label={t(`Dashboard.${theme?.name === "dark" ? "Dark" : "Light"}Theme`)}
      iconName={theme?.name === "dark" ? "ClearNight" : "Sunny"} />
  );
  const handleChange = useCallback((name) => (onChange?.({ ...themes[name], name })), [onChange]);
  const icon = useMemo(getIcon, [t, theme?.name]);
  const onMount = () => (void handleChange(getDefaultThemeName()));
  useEffect(onMount, [onChange]);
  const onChange_toggle = (_, isDark) => (void handleChange(isDark ? "dark" : "light"));
  return (
    <Toggle inlineLabel={true} label={icon} checked={theme?.name === "dark"} onChange={onChange_toggle} />
  );
};
ThemePicker.displayName = "ThemePicker";

export default ThemePicker;
