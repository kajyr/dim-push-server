require("dotenv").config();
const express = require("express");
const WebSocket = require("ws");
const colors = require("colors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const clients = require("./clients");

const info = (...msg) => console.log(colors.blue(...msg));
const log = (...msg) => console.log(colors.yellow(...msg));

const app = express();

let server;
let wss;

function listen(appa, port) {
  return new Promise((resolve) => {
    const server = appa.listen(port, () => resolve(server));
  });
}

async function run() {
  // Express
  app.use(bodyParser.json());
  app.use(express.static("public"));
  routes(app);

  const server = await listen(app, process.env.PORT);
  const serverUri = `http://localhost:${server.address().port}`;
  const wssUri = `ws://localhost:${process.env.PORT}`;

  info("Http Server available at", serverUri);

  // Socket Server
  wss = new WebSocket.Server({ server });
  info("WebSocket Server available at", wssUri);

  wss.on("connection", function connection(ws) {
    log("Client connected");

    clients.register(ws);
  });
}

function exitHandler(e) {
  console.log("Exiting...", e);
  wss && wss.close();

  server &&
    server.close(() => {
      info("Http Server closed");
      process.exit();
    });
}

//do something when app is closing
process.on("exit", () => exitHandler());
//catches ctrl+c event
process.on("SIGINT", () => exitHandler());

process.on("uncaughtException", (err) => exitHandler(err));

run();
