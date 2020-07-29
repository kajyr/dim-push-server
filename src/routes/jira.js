const { getPaginated } = require("../jira");

module.exports = [
  {
    method: "GET",
    path: `/api/jira/open`,

    handler: (req, res) => {
      getPaginated(
        `project = WEBAPPDEV AND status in ("Be Ready to Release", "In Progress", Open, Reopened, "Selected for Development", "Technical Review") AND resolution = Unresolved order by priority DESC,updated DESC`
      ).then((response) => {
        res.send({
          ok: 1,
          response,
        });
      });
    },
  },
  {
    method: "GET",
    path: `/api/jira/search`,

    handler: (req, res) => {
      const { jql } = req.query;

      getPaginated(jql).then((response) => {
        res.send({
          ok: 1,
          response,
        });
      });
    },
  },
];
