const nodeRouter = require("./routes/mainRouter");
const webServer = require("./routes/webServer");
const websocketHelper = require("./helpers/websocketHelper");
const config = require("./config/appConfig");
const { getAllOrderbook, getAllCharts, getAllHistory } = require("./helpers/getAllDataHelper");
const { getTVСhartData } = require("./routes/externalAPI/raydium");

getAllOrderbook();
// getAllCharts();
// getAllHistory();

// nodeRouter.externalApiRouter.raydium.getHistory(); //write to DB
// nodeRouter.externalApiRouter.raydium.getTVСhartData(); //write to DB

websocketHelper.websocketServer();

// const ws = websocketHelper.websocketClient();
// nodeRouter.externalApiRouter.serum.getSerumData(ws);


module.exports = {
    webServer
}