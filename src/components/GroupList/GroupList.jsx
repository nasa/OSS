const GroupList = ({ groups = [] } = {}) =>
{
  return (
    Array.isArray(groups)
      ? <div style={{ textAlign: "center" }}>Groups retrieved: {groups.length}</div>
      : <div style={{ textAlign: "center" }}>Retrieving groups&hellip;</div>
  );
};
GroupList.displayName = "GroupList";

export default GroupList;
