var needle = require("needle");

function btoa(str) {
  return Buffer.from(str).toString("base64");
}
const auth = `Basic ${btoa(
  `${process.env.JIRA_USER}:${process.env.JIRA_TOKEN}`
)}`;

module.exports = [
  {
    method: "GET",
    path: `/api/jira/issues`,

    handler: (req, res) => {
      needle(
        "get",
        "https://uberresearch.atlassian.net/rest/api/latest/search",
        null,
        {
          headers: {
            Authorization: auth,
            "Content-Type": "application/json",
          },
        }
      ).then((response) => {
        res.send({
          ok: 1,
          response: response.body,
        });
      });
    },
  },
];
