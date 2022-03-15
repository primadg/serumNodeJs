const { Single } = require("rsocket-flowable");
const store = require("../../redux/store");
const USE_MARKETS = require("../../config/markets");

function handleRequestResponse(payload) {
  console.log(payload.data);
  const { type } = JSON.parse(payload.data);
  if (type === "chart") {
    const { address, resolution, from, to } = JSON.parse(payload.data);
    return new Single((subscriber) => {
      subscriber.onSubscribe(() => {});
      subscriber.onComplete({
        data: JSON.stringify({ test: "jopa" }),
        metadata: null,
      });
    });
  }
}

module.exports = {
  handleRequestResponse,
};
