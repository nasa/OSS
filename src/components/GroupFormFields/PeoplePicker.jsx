import { useEffect, useRef } from "react";
import { PrincipalSource, PrincipalType, sp } from "@pnp/sp";
import { Components } from "gd-sprest-react";

const PeoplePicker = ({ allowGroups, allowMultiple, fieldName, label, onChange, value, ...props }) =>
{
  const refPicker = useRef();
  const searchForValue = async (strValue) =>
  {
    const mapSearchResultToPersona = ({ DisplayText, EntityData: { SPGroupID, SPUserID }, Key }) =>
      ({ EntityData: { SPGroupID, SPUserID }, id: Key, itemID: SPGroupID || SPUserID, primaryText: DisplayText });
    return (strValue
      ? (await sp.profiles.clientPeoplePickerSearchUser({
          MaximumEntitySuggestions: 15,
          PrincipalSource: PrincipalSource.UserInfoList,
          PrincipalType: allowGroups ? PrincipalType.All : PrincipalType.User,
          QueryString: strValue
        }))
      : []).map(mapSearchResultToPersona);
  };
  const handleChange = async (results = []) =>
  {
    const mapSearch = async (result) => ((await searchForValue(result?.id))[0]);
    onChange?.(allowMultiple ? { results } : results[0]);
    onChange?.(await (allowMultiple ? { results: results.map(mapSearch) } : mapSearch(results[0])));
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
    <label htmlFor={fieldName}>{label}</label>
    <Components.SPPeoplePicker {...propsPicker} id={fieldName} ref={refPicker} />
  </>);
};
PeoplePicker.displayName = "PeoplePicker";

export default PeoplePicker;
