const webServer = require("./routes/webServer");
const websocketHelper = require("./helpers/websocketHelper");
const { getAllOrderbook, getAllCharts, getAllHistory } = require("./helpers/getAllDataHelper");

const debug = false;

getAllOrderbook(debug);
getAllCharts(debug);
getAllHistory(debug);

websocketHelper.websocketServer();

module.exports = {
  webServer,
};
