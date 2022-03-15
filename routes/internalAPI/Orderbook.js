const { Flowable } = require("rsocket-flowable");
const store = require("../../redux/store");
const { getSerumData } = require("../externalAPI/serum");
const USE_MARKETS = require("../../config/markets");
const { getTVСhartData } = require("../externalAPI/raydium");
const { getTransactions } = require("../externalAPI/quicknode");

function handleRequestStream(payload) {
  console.log(payload.data);
  getSerumData();
  let currentOrderbookData;
  let lastOrderbookData;
  if (payload.data) {
    const flowable = new Flowable((subscriber) => {
      subscriber.onSubscribe({
        cancel: () => {
          /* no-op */
        },
        request: (n) => {
          store.subscribe(() => {
            const { bidsL2 = [], asksL2 = [] } = store.getState().chartDataReducer[JSON.parse(payload.data)] || {};
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
          });
        },
      });
    });

    flowable.subscribe({
      // onComplete: () => console.log('done'),
      // onError: (error) => console.error(error),
      // onNext: (value) => console.log(value),
      onSubscribe: (sub) => sub.request(Infinity),
    });
    return flowable;
  }
}

module.exports = {
  handleRequestStream,
};
