const store = require("../../redux/store");

function handleRequestStream(message, ws, id) {
  const { event, payload } = message;
  if (event !== "orderbook") {
    return;
  }
  const { name } = payload;
  if (!name) return;
  let currentOrderbookData;
  let lastOrderbookData;
  let interval = setInterval(() => {
    const { bidsL2 = [], asksL2 = [] } = store.getState().orderbookDataReducer[name] || {};
    currentOrderbookData = {
      bids: bidsL2,
      asks: asksL2,
    };
    if (JSON.stringify(currentOrderbookData) !== JSON.stringify(lastOrderbookData)) {
      ws.send(
        JSON.stringify({
          id,
          data: currentOrderbookData,
          metadata: null,
        })
      );
      lastOrderbookData = {
        bids: bidsL2,
        asks: asksL2,
      };
    }
  }, 2000);
  return interval;
}

module.exports = {
  handleRequestStream,
};
