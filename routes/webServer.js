const express = require('express');
const app = express();
const port = 3500
const bodyParser = require('body-parser');
const chartsController = require('./internalAPI/chartsController')
const historyController = require('./internalAPI/historyController')
const marketInfoController = require('./internalAPI/marketInfoController')
const pairStatsController = require("./internalAPI/pairStatsController");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/chart", chartsController.getChart);
app.get("/history", historyController.getHistory);
app.get("/symbols", marketInfoController.getMarketInfo);
app.get("/pairs", pairStatsController.getPairStatsData);

app.listen(port, () => {
    console.log(`App listen on port ${port}`)
})

module.exports = app;
