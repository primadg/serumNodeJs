const { Flowable } = require("rsocket-flowable");
const store = require("../../redux/store");

function handleRequestStream(payload) {
  const name = JSON.parse(payload.data);
  if (!name) return;
  let currentOrderbookData;
  let lastOrderbookData;
  // const flowable = new Flowable((subscriber) => {
  return new Flowable((subscriber) => {
    subscriber.onSubscribe({
      cancel: () => {
        /* no-op */
        // need write clearInterval
      },
      request: (n) => {
        store.subscribe(() => {
          //need rewrite to setInterval
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
        });
      },
    });
  });

  // flowable.subscribe({
  // onComplete: () => console.log('done'),
  // onError: (error) => console.error(error),
  // onNext: (value) => console.log(value),
  // onSubscribe: (sub) => sub.request(Infinity),
  // });
  // return flowable;
}

module.exports = {
  handleRequestStream,
};
