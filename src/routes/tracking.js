const clients = require("../clients");

module.exports = [
  {
    method: "POST",
    path: `/api/notification`,

    handler: (req, res) => {
      console.log("--- new post", req.body);

      const { channel_id, ...rest } = req.body;

      if (!channel_id) {
        res.status(400);
      } else {
        clients.pushMessage(channel_id, rest);

        res.send({
          ...rest,
        });
      }
    },
  },
];
