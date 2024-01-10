import { useCallback, useEffect, useMemo } from "react";
import { Icon, Toggle } from "@fluentui/react";
import { themes } from "./ThemePicker.constants";
import { getDefaultThemeName } from "./ThemePicker.helpers";
import { useTranslation } from "react-i18next";

/**
 * This is an object with any color or font overrides for this theme.
 * @typedef Theme
 * @member {Object} palette The color overrides for this theme. Review
 *  [Theme Slots]{@link https://developer.microsoft.com/en-us/fluentui#/styles/web/colors/theme-slots} for information
 *  about which colors can be overridden.
 */

/**
 * Display a toggle that indicates the current them and allows the user to switch between light and dark themes.
 *
 * @component
 * @param {onChangeHandler} onChange The function to call when the user changes the value of the Theme Picker toggle.
 * @param {Theme} theme The currently selected theme.
 * @public
 * @returns {JSX} The UI for switching between light and dark themes.
 */
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
