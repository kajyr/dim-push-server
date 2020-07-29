var needle = require("needle");

function btoa(str) {
  return Buffer.from(str).toString("base64");
}
const auth = `Basic ${btoa(
  `${process.env.JIRA_USER}:${process.env.JIRA_TOKEN}`
)}`;
console.log("eee", auth);

module.exports = [
  {
    method: "GET",
    path: `/jira/issues`,

    handler: (req, res) => {
      // console.log("eee");

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
        /*         if (!error && response.statusCode == 200) console.log(response.body);
         */

        res.send({
          ok: 1,
          response: response.body,
        });
      });
    },
  },
];
