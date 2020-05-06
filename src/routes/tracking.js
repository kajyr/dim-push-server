const clients = require("../clients");

module.exports = [
  {
    method: "POST",
    path: `/notification`,

    handler: (req, res) => {
      console.log("--- new post", req.body);

      const { channel_id, ...rest } = req.body;

      if (!channel_id) {
        res.send(400, "Channel is empty");
      }

      clients.pushMessage(channel_id, rest);

      res.send({
        ...rest
      });
    }
  }
];
