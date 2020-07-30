import React, { useEffect, useReducer } from "react";

import Loader from "./Loader";
import reducer from "./reducer";
import AgeChart from "./Chart";

const API_ENDPOINT = "/api/jira/open";

const App = ({}) => {
  const [state, dispatch] = useReducer(reducer, { loading: true });
  useEffect(() => {
    fetch(API_ENDPOINT)
      .then((req) => req.json())
      .then((data) => {
        dispatch({ type: "JIRA_ISSUES_LOADED", ...data.response });
      });
  }, []);

  console.log("---", state);

  if (state.loading) {
    return <Loader />;
  }
  return (
    <div>
      <h1>Jira has issues</h1>
      <p>{state.total} total open issues</p>
      <AgeChart issues={state.issues} />
    </div>
  );
};

export default App;
