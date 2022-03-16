const { HISTORY_DATA } = require("../types");
const mainAction = require("../mainAction");

const setHistoryData = (data, pair) => {
  return mainAction(HISTORY_DATA, data, pair);
};

module.exports = setHistoryData;
