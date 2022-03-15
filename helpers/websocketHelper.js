//Helper for socket io modules
const config = require("../config/appConfig");
const RequestHandler = require("../routes/internalAPI/TV_chart");
const StreamHandler = require("../routes/internalAPI/Orderbook");

const rSocketPort = config.rSocketPort;
const rSocketHost = config.rSocketHost;
const transportOpts = {
  host: rSocketHost,
  port: rSocketPort,
};

const getRequestHandler = (requestingRSocket, setupPayload) => {
  //   function handleFireAndForget() {
  //     return RequestHandler.handleFireAndForget();
  //   }
  function handleRequestResponse(payload) {
    return RequestHandler.handleRequestResponse(payload);
  }
  function handleRequestStream(payload) {
    return StreamHandler.handleRequestStream(payload);
  }
  //   function handleRequestChannel(payload) {
  //     return RequestHandler.handleRequestChannel();
  //   }
  //   function handleMetadataPush(payload) {
  //     return RequestHandler.handleMetadataPush();
  //   }
  return {
    // fireAndForget: handleFireAndForget,
    requestResponse: handleRequestResponse,
    requestStream: handleRequestStream,
    // requestChannel: handleRequestChannel,
    // metadataPush: handleMetadataPush,
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