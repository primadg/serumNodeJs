const { createStore, combineReducers } = require("redux");
const chartDataReducer = require("./TV_charts/reducer");

const store = createStore(
  combineReducers({
    chartDataReducer,
  })
);

module.exports = store;
