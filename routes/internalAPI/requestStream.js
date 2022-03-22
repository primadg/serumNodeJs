const { Flowable } = require("rsocket-flowable");
const store = require("../../redux/store");

function handleRequestStream(payload) {
  const name = JSON.parse(payload.data);
  if (!name) return;
  let currentOrderbookData;
  let lastOrderbookData;
  let interval;
  return new Flowable((subscriber) => {
    subscriber.onSubscribe({
      cancel: () => {
        clearInterval(interval);
      },
      request: (n) => {
        interval = setInterval(() => {
          const { bidsL2 = [], asksL2 = [] } = store.getState().orderbookDataReducer[JSON.parse(payload.data)] || {};
          currentOrderbookData = {
            bids: bidsL2,
            asks: asksL2,
          };
          if (JSON.stringify(currentOrderbookData) !== JSON.stringify(lastOrderbookData)) {
            subscriber.onNext({
              data: JSON.stringify(currentOrderbookData),
              metadata: null,
            });
            lastOrderbookData = {
              bids: bidsL2,
              asks: asksL2,
            };
          }
        }, 2000);
      },
    });
  });
}

module.exports = {
  handleRequestStream,
};
