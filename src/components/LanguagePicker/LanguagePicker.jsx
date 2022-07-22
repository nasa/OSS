import { useCallback, useMemo, useRef, useState } from "react";
import { ContextualMenu, DirectionalHint, Icon } from "@fluentui/react";
import i18n from "../../i18n";

const LanguagePicker = () =>
{
  const getItems = () =>
  {
    const hasIdentification = ([, value]) => (!!value.identification);
    const mapChoice = ([key, { identification }]) =>
      ({ href: `${window.location.pathname}?lng=${key}`, key, text: identification });
    return Object.entries(i18n.options.resources).filter(hasIdentification).map(mapChoice);
  };
  const items = useMemo(getItems, []);
  const [hidden, setHidden] = useState(true);
  const showHideMenu = useCallback((hide) => () => (void setHidden(hide)), [setHidden]);
  const refPicker = useRef();
  return (<div ref={refPicker} style={{ marginLeft: "16px", paddingBottom: "5px", paddingTop: "5px" }}>
    <Icon iconName="LocaleLanguage" onClick={showHideMenu(false)} style={{ cursor: "pointer" }} tabIndex="0" />
    <ContextualMenu
      alignTargetEdge={true}
      directionalHint={DirectionalHint.bottomRightEdge}
      hidden={hidden}
      items={items}
      onDismiss={showHideMenu(true)}
      target={refPicker} />
  </div>);
};
LanguagePicker.displayName = "LanguagePicker";

export default LanguagePicker;
