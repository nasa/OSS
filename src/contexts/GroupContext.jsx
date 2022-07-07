import { createContext } from "react";

const GroupContext = createContext({
  group: undefined,
  onChange: undefined,
  validation: undefined,
  web: undefined
});

export default GroupContext;
