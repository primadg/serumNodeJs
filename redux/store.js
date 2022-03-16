const { createStore, combineReducers } = require("redux");
const orderbookDataReducer = require("./Orderbook/reducer");
const chartDataReducer = require("./TV_charts/reducer");
const historyDataReducer = require("./History/reducer");

const store = createStore(
  combineReducers({
    chartDataReducer,
    orderbookDataReducer,
    historyDataReducer,
  })
);

module.exports = store;
