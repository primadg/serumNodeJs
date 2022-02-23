//Helper for socket io modules
const config = require("../config/appConfig");
const RequestHandler = require("../routes/internalAPI/TW_chart");
const rSocketPort = config.rSocketPort;
const rSocketHost = config.rSocketHost;
const transportOpts = {
    host: rSocketHost,
    port: rSocketPort,
};

function websocketServer() {
    const { RSocketServer } = require('rsocket-core');
    const RSocketWebSocketServer = require('rsocket-websocket-server');
    const WebSocketTransport = RSocketWebSocketServer.default;
    const transport = new WebSocketTransport(transportOpts);

    const rSocketServer = new RSocketServer({
        transport,
        getRequestHandler: (data)=>{RequestHandler.getRequestHandler(data)},
    });

    console.log(`Server starting on port ${rSocketPort}...`);

    rSocketServer.start();
}

function websocketClient(url="wss://api.serum-vial.dev/v1/ws") {
 console.log("websocket client")
    const WebSocket = require('ws')
    const ws = new WebSocket(url)
    return ws;
}

function init() {
    console.log("init")
}

module.exports = {
    websocketServer,
    websocketClient,
};