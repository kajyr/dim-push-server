const clients = new Map();

function registerClient(channel, ws) {
  const activeClients = clients.get(channel) || [];
  clients.set(channel, activeClients.concat(ws));

  ws.on("close", function close() {
    const activeClients = clients.get(channel);

    clients.set(
      channel,
      activeClients.filter(client => client !== ws)
    );

    console.log("Client disconnected");
  });
}

module.exports = {
  register: ws => {
    console.log("New client connected");
    ws.on("message", function incoming(datastr) {
      const data = JSON.parse(datastr);
      if (data.type === "REGISTER" && data.channel_id) {
        registerClient(data.channel_id, ws);
        console.log("Client registered on channel: ", data.channel_id);
      }
    });
  },

  pushMessage(channel, payload) {
    const activeClients = clients.get(channel);

    if (!activeClients || activeClients.lenght === 0) {
      return;
    }

    const message = JSON.stringify({ payload });

    activeClients.forEach(client => {
      client.send(message);
    });
  }
};
