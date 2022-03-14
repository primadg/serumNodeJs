const { CHART_DATA } = require("../types");
const mainAction = require("../mainAction");

const setChartData = (data, pair) => {
  return mainAction(CHART_DATA, data, pair);
};

module.exports = setChartData;
