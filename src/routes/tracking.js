const clients = require("../clients");

module.exports = [
  {
    method: "POST",
    path: `/notification`,

    handler: (req, res) => {
      const { channel_id, ...rest } = req.body;

      clients.pushMessage(channel_id, rest);

      res.send({
        ...rest
      });
    }
  }
];
