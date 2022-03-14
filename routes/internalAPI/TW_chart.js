const { Single } = require('rsocket-flowable');
const { Flowable } = require('rsocket-flowable');
const store = require("../../redux/store");
const { getSerumData } = require("../externalAPI/serum");
const USE_MARKETS = require("../../config/markets");
const { getTVСhartData } = require("../externalAPI/raydium");

// const statuses = {
//     PENDING: 'pending',
//     CANCELLED: 'cancelled',
// };

// function handleFireAndForget() {
//     console.log("11")
// }

function handleRequestResponse(payload) {
  console.log(payload);
  return new Single((subscriber) => {
    subscriber.onSubscribe(() => {});
    subscriber.onComplete({
      data: JSON.stringify({ test: "jopa" }),
      metadata: null,
    });
  });
}

function handleRequestStream(payload) {
  getTVСhartData();
  let currentOrderbookData;
  let lastOrderbookData;
  if (payload.data) {
    const flowable = new Flowable((subscriber) => {
      // lambda is not executed until `subscribe()` is called
      subscriber.onSubscribe({
        cancel: () => {
          /* no-op */
        },
        request: (n) => {
          store.subscribe(() => {
            // const { bidsL2 = [], asksL2 = [] } = store.getState().chartDataReducer[JSON.parse(payload.data)] || {};
            // currentOrderbookData = {
            //   bids: bidsL2,
            //   asks: asksL2,
            // };
            // if (JSON.stringify(currentOrderbookData) !== JSON.stringify(lastOrderbookData)) {
            //   subscriber.onNext({
            //     data: JSON.stringify(currentOrderbookData),
            //     metadata: null,
            //   });
            //   lastOrderbookData = {
            //     bids: bidsL2,
            //     asks: asksL2,
            //   };
            // }
            subscriber.onNext({
              data: JSON.stringify(store.getState().chartDataReducer),
              metadata: null,
            });
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

// function handleRequestChannel(payload) {
//     return new Flowable((subscriber) => {
//         console.log(subscriber, 3)
//     });
// }

// function handleMetadataPush(payload) {
//     return new Single((subscriber) => {
//         console.log(subscriber, 4)
//     });
// }

// function getRequestHandler(payload) {
//     const single = new Single((subscriber) => {
//         const id = setTimeout(() => subscriber.onComplete('hello!'), 250);
//         // Cancellation callback is optional
//         subscriber.onSubscribe(() => clearTimeout(id));
//     });

//     single.subscribe({
//         onComplete: (data) => console.log(data),
//         onError: (error) => console.error(error),
//         onSubscribe: (cancel) => {
//             // console.log(cancel)
//             /* call cancel() to stop onComplete/onError */
//         },
//     });
//     return single;
// }

module.exports = {
  // getRequestHandler,
  // handleFireAndForget,
  handleRequestResponse,
  handleRequestStream,
  // handleRequestChannel,
  // handleMetadataPush,
};