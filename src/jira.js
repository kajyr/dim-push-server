var needle = require("needle");

const API_RESULT_LIMIT = 500;

function btoa(str) {
  return Buffer.from(str).toString("base64");
}
const auth = `Basic ${btoa(
  `${process.env.JIRA_USER}:${process.env.JIRA_TOKEN}`
)}`;

function searchJira(jql, start = 0) {
  const url = `https://uberresearch.atlassian.net/rest/api/latest/search?jql=${jql}&startAt=${start}&maxResults=1000`;
  return needle("get", url, null, {
    headers: {
      Authorization: auth,
      "Content-Type": "application/json",
    },
  }).then((res) => res.body);
}

const startingResponse = {
  startAt: 0,
  maxResults: 0,
  total: 1,
  issues: [],
};

function getPaginated(jql, currentResults = startingResponse) {
  return searchJira(jql, currentResults.startAt)
    .then((response) => {
      const { startAt, maxResults, total, issues } = response;

      const results = {
        startAt: Math.min(currentResults.startAt + maxResults, total),
        maxResults: currentResults.maxResults + maxResults,
        total,
        issues: currentResults.issues.concat(issues),
      };

      if (startAt + maxResults < Math.min(total, API_RESULT_LIMIT)) {
        return getPaginated(jql, results);
      }
      return results;
    })
    .then((results) => {
      return { ...results, startAt: 0, maxResults: API_RESULT_LIMIT };
    });
}

module.exports = {
  searchJira,
  getPaginated,
};
