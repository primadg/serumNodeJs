const nodeRouter = require("./routes/mainRouter");
const webServer = require("./routes/webServer");
const websocketHelper = require("./helpers/websocketHelper");
const config = require("./config/appConfig");
const { getSerumData } = require("./routes/externalAPI/serum");
const { getHistory, getTVСhartData } = require("./routes/externalAPI/raydium");
const USE_MARKETS = require("./config/markets");

// setInterval(async () => {
  for (let i = 0; i < USE_MARKETS.length; i++) {
    const { address, programId, name } = USE_MARKETS[i];
  // await new Promise((resolve) => {
    // setTimeout(async () => {
  // getSerumData(address, programId, name);
      // resolve();
    // }, 500);
  // });
  }
  // getHistory();
// }, 2000);

// nodeRouter.externalApiRouter.raydium.getHistory(); //write to DB
// nodeRouter.externalApiRouter.raydium.getTVСhartData(); //write to DB

websocketHelper.websocketServer();

// const ws = websocketHelper.websocketClient();
// nodeRouter.externalApiRouter.serum.getSerumData(ws);


module.exports = {
    webServer
}