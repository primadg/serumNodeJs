//Helper for rsocket modules
const http = require("http");
const WebSocket = require("ws");
const config = require("../config/appConfig");
const StreamHandler = require("../routes/internalAPI/requestStream");
const { app } = require("../routes/webServer");

const socketPort = config.rSocketPort;

function noop() {}

function* generateStreemId() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

function* generateSocketId() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const getStreemID = generateStreemId();

const getSocketID = generateSocketId();

const intervals = [];

function websocketServer() {
  const server = http.createServer(app);

  const webSocketServer = new WebSocket.Server({ server });

  webSocketServer.on("connection", (ws) => {
    const newSocketId = getSocketID.next().value;
    intervals[newSocketId] = [];
    ws.on("message", (message) => {
      const parsedMessage = JSON.parse(message);
      if (parsedMessage.id) {
        clearInterval(intervals[newSocketId][parsedMessage.id]);
      }
      if (parsedMessage.payload) {
        const newId = getStreemID.next().value;
        intervals[newSocketId][newId] = StreamHandler.handleRequestStream(parsedMessage, ws, newId);
      }
    });

    ws.onclose = () => {
      intervals[newSocketId].forEach((el) => {
        clearInterval(el);
      });
    };

    ws.on("error", (e) => ws.send(e));

    ws.on("pong", heartbeat);

    ws.send(JSON.stringify({ type: "id", ID: newSocketId }));
  });

  function heartbeat() {
    this.isAlive = true;
  }

  const interval = setInterval(function ping() {
    webSocketServer.clients.forEach((ws) => {
      if (ws.isAlive === false) {
        intervals[ws].forEach((interval) => {
          clearInterval(interval);
        });
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 60000);

  server.listen(socketPort, () => console.log(`Websocket server started on port ${socketPort}`));
}

module.exports = {
  websocketServer,
};
