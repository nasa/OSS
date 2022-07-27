import { useEffect, useMemo, useRef, useState } from "react";
import { NormalPeoplePicker } from "@fluentui/react";
import { PrincipalSource, PrincipalType, sp } from "@pnp/sp";
import { useTranslation } from "react-i18next";

const PeoplePicker = ({
  allowGroups, allowMultiple, errorMessage, fieldName, label, onChange, required, value, ...props
}) =>
{
  const [personas, setPersonas] = useState([]);
  const { t } = useTranslation();
  const pickerSuggestionsProps = useMemo(() => ({
    loadingText: t(`PeoplePicker.${allowGroups ? "loadingUsersAndGroups" : "loadingUsers"}`),
    noResultsFoundText: t(`PeoplePicker.${allowGroups ? "noUsersOrGroupsFound" : "noUsersFound"}`),
    searchForMoreText: t("PeoplePicker.searchForMore"),
    suggestionsHeaderText: t(`PeoplePicker.${allowGroups ? "suggestedUsersOrGroupsHeader" : "suggestedUsersHeader"}`),
    ...(props?.pickerSuggestionsProps ?? {})
  }), [allowGroups, props?.pickerSuggestionsProps, t]);
  const refPicker = useRef();
  const onRemount = () =>
  {
    if (refPicker?.current && (typeof value === "string"))
    {
      searchForValue(value).then(refPicker.current.onChange.bind(refPicker.current));
    }
  };
  useEffect(onRemount, [refPicker, value]);
  const searchForValue = async (strValue, options = {}) =>
  {
    const mapSearchResultToPersona = ({ DisplayText, EntityData: { Email, SPGroupID, SPUserID, Title }, Key }) =>
      ({
        EntityData: { SPGroupID, SPUserID },
        id: Key,
        itemID: SPGroupID || SPUserID,
        primaryText: DisplayText,
        secondaryText: Title,
        tertiaryText: Email
      });
    return (
      strValue
        ? (await sp.profiles.clientPeoplePickerSearchUser({
            MaximumEntitySuggestions: 15,
            PrincipalSource: PrincipalSource.UserInfoList,
            PrincipalType: allowGroups ? PrincipalType.All : PrincipalType.User,
            QueryString: strValue,
            ...options
          }))
        : []
    ).map(mapSearchResultToPersona);
  };
  const searchAll = (strValue) => (searchForValue(strValue, { MaximumEntitySuggestions: 5000 }));
  const getTextFromItem = ({ text }) => (text);
  const handleChange = async (results = []) =>
  {
    const mapSearch = async (result) => ((await searchForValue(result?.id))[0]);
    onChange?.(allowMultiple ? { results } : results[0]);
    const resultsSearch = await Promise.all(results.map(mapSearch));
    onChange?.(allowMultiple ? { results: resultsSearch } : resultsSearch[0]);
    setPersonas(resultsSearch);
  };
  const propsPicker = { ...(props || {}), getTextFromItem, pickerSuggestionsProps };
  return (<>
    <label className={required ? "required" : ""} htmlFor={fieldName} style={{ textAlign: "left" }}>{label}</label>
    <NormalPeoplePicker
      {...propsPicker}
      id={fieldName}
      onChange={handleChange}
      onGetMoreResults={searchAll}
      onResolveSuggestions={searchForValue}
      ref={refPicker}
      selectedItems={personas} />
    <div className="errorMessage" role="alert" style={{ display: errorMessage ? "" : "none" }}>{errorMessage}</div>
  </>);
};
PeoplePicker.displayName = "PeoplePicker";

export default PeoplePicker;
