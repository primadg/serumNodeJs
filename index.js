const nodeRouter = require("./routes/mainRouter");
const webServer = require("./routes/webServer");
const websocketHelper = require("./helpers/websocketHelper");
const config = require("./config/appConfig");


// nodeRouter.externalApiRouter.raydium.getHistory();
// nodeRouter.externalApiRouter.raydium.getTVСhartData();

websocketHelper.websocketServer();

// const ws = websocketHelper.websocketClient();
// nodeRouter.externalApiRouter.serum.getSerumData(ws);


module.exports = {
    webServer
}