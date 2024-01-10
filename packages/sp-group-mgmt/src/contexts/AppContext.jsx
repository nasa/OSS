import { createContext } from "react";

const AppContext = createContext({
  actions: {
    addMember: true,
    createGroup: true,
    deleteGroup: true,
    removeMember: true,
    updateGroup: true
  },
  filters: {}
});

export default AppContext;
