const { PAIRSTATS_DATA } = require("../types");
const mainAction = require("../mainAction");

const setPairStatsData = (data, pair) => {
  return mainAction(PAIRSTATS_DATA, data, pair);
};

module.exports = setPairStatsData;
