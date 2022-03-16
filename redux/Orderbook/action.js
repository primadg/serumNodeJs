const { ORDERBOOK_DATA } = require("../types");
const mainAction = require("../mainAction");

const setOrderbookData = (data, pair) => {
  return mainAction(ORDERBOOK_DATA, data, pair);
};

module.exports = setOrderbookData;
