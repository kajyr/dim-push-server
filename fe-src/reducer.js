function reducer(state, action) {
  const { type, ...payload } = action;

  switch (type) {
    case "JIRA_ISSUES_LOADED":
      return { ...payload, loading: false };

    default:
      throw new Error();
  }
}

export default reducer;
