import { useEffect, useRef } from "react";
import { PrincipalSource, PrincipalType, sp } from "@pnp/sp";
import { Components } from "gd-sprest-react";

const PeoplePicker = ({
  allowGroups, allowMultiple, errorMessage, fieldName, label, onChange, required, value, ...props
}) =>
{
  const refPicker = useRef();
  const searchForValue = async (strValue) =>
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
            QueryString: strValue
          }))
        : []
    ).map(mapSearchResultToPersona);
  };
  const handleChange = async (results = []) =>
  {
    const mapSearch = async (result) => ((await searchForValue(result?.id))[0]);
    onChange?.(allowMultiple ? { results } : results[0]);
    const resultsSearch = await Promise.all(results.map(mapSearch));
    onChange?.(allowMultiple ? { results: resultsSearch } : resultsSearch[0]);
  };
  const onRemount = () =>
  {
    if (refPicker?.current && (typeof value === "string"))
    {
      searchForValue(value).then(refPicker.current.onChange);
    }
  };
  useEffect(onRemount, [refPicker, value]);
  const propsPicker = {
    allowGroups,
    allowMultiple,
    props: { ...props, onChange: handleChange }
  };
  return (<>
    <label className={required ? "required" : ""} htmlFor={fieldName} style={{ textAlign: "left" }}>{label}</label>
    <Components.SPPeoplePicker {...propsPicker} id={fieldName} ref={refPicker} />
    <div className="errorMessage" role="alert" style={{ display: errorMessage ? "" : "none" }}>{errorMessage}</div>
  </>);
};
PeoplePicker.displayName = "PeoplePicker";

export default PeoplePicker;
