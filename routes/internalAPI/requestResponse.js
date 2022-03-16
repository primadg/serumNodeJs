const { Single } = require("rsocket-flowable");
const { getTVСhartData, getHistory } = require("../externalAPI/raydium");

function handleRequestResponse(payload) {
  const { type, params } = JSON.parse(payload.data);
  if (type === "chart") {
    const { address, name, resolution, from, to } = params;
    if (address && name && resolution && to) {
      return new Single((subscriber) => {
        getTVСhartData(address, name, resolution, from, to).then((data) => {
          subscriber.onSubscribe(() => {});
          subscriber.onComplete({
            data,
            metadata: null,
          });
        });
      });
    }
  } else if (type === "history") {
    const { address, name } = params;
    if (address && name) {
      return new Single((subscriber) => {
        getHistory(address, name).then((data) => {
          subscriber.onSubscribe(() => {});
          subscriber.onComplete({
            data,
            metadata: null,
          });
        });
      });
    }
  }
}

module.exports = {
  handleRequestResponse,
};
