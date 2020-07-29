var needle = require("needle");

const API_RESULT_LIMIT = 500;

function btoa(str) {
  return Buffer.from(str).toString("base64");
}
const auth = `Basic ${btoa(
  `${process.env.JIRA_USER}:${process.env.JIRA_TOKEN}`
)}`;

function searchJira(jql, start = 0) {
  console.log("query", jql, start);
  return needle(
    "get",
    `https://uberresearch.atlassian.net/rest/api/latest/search?jql=${jql}&startAt=0&maxResults=1000`,
    null,
    {
      headers: {
        Authorization: auth,
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.body);
}

const startingResponse = {
  startAt: 0,
  maxResults: 0,
  total: 1,
  issues: [],
};

function getPaginated(jql, currentResults = startingResponse) {
  return searchJira(jql, currentResults.startAt).then((response) => {
    const { startAt, maxResults, total, issues } = response;

    const results = {
      startAt: currentResults.startAt + startAt,
      maxResults: currentResults.maxResults + maxResults,
      total: currentResults.total + total,
      issues: currentResults.issues.concat(issues),
    };

    console.log("resp", startAt, maxResults, total, results.startAt);

    /*  if (startAt + maxResults < total) {
      return getPaginated(jql, results);
    } */
    return response;
  });
}

module.exports = {
  searchJira,
  getPaginated,
};
