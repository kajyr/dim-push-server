module.exports = [
  {
    method: "POST",
    path: `/notification`,

    handler: (req, res) => {
      console.log(req.body);

      res.send({
        ...req.body
      });
    }
  }
];
