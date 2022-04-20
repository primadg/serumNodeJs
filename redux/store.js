const { createStore, combineReducers } = require("redux");
const orderbookDataReducer = require("./Orderbook/reducer");
const chartDataReducer = require("./TV_charts/reducer");
const historyDataReducer = require("./History/reducer");
const pairStatsDataReducer = require("./PairStats/reducer");

const store = createStore(
  combineReducers({
    chartDataReducer,
    orderbookDataReducer,
    historyDataReducer,
    pairStatsDataReducer,
  })
);

module.exports = store;
