//Helper for rsocket modules
const config = require("../config/appConfig");
const RequestHandler = require("../routes/internalAPI/requestResponse");
const StreamHandler = require("../routes/internalAPI/requestStream");

const rSocketPort = config.rSocketPort;
const rSocketHost = config.rSocketHost;
const transportOpts = {
  host: rSocketHost,
  port: rSocketPort,
};

const getRequestHandler = () => {
  function handleRequestResponse(payload) {
    return RequestHandler.handleRequestResponse(payload);
  }
  function handleRequestStream(payload) {
    return StreamHandler.handleRequestStream(payload);
  }
  return {
    requestResponse: handleRequestResponse,
    requestStream: handleRequestStream,
  };
};

function websocketServer() {
  const { RSocketServer } = require("rsocket-core");
  const RSocketWebSocketServer = require("rsocket-websocket-server");
  const WebSocketTransport = RSocketWebSocketServer.default;
  const transport = new WebSocketTransport(transportOpts);

  const rSocketServer = new RSocketServer({
    transport,
    getRequestHandler,
  });

  console.log(`Server starting on port ${rSocketPort}...`);

  rSocketServer.start();
}

module.exports = {
  websocketServer,
};
