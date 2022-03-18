const { Single } = require("rsocket-flowable");
const store = require("../../redux/store");

function handleRequestResponse(payload) {
  const { type, params } = JSON.parse(payload.data);
  if (type === "chart") {
    const { name, resolution, from, to } = params;
    if (name && resolution && from && to) {
      return new Single((subscriber) => {
        const dataFromStore = store.getState().chartDataReducer[name][resolution];
        let dataToSend = {
          c: [],
          h: [],
          l: [],
          o: [],
          t: [],
          v: [],
          s: "ok",
        };
        for (let time in dataFromStore) {
          if (parseInt(from) < parseInt(time) && parseInt(to) > parseInt(time)) {
            dataToSend.c.push(dataFromStore[time].c);
            dataToSend.h.push(dataFromStore[time].h);
            dataToSend.l.push(dataFromStore[time].l);
            dataToSend.o.push(dataFromStore[time].o);
            dataToSend.t.push(dataFromStore[time].t);
            dataToSend.v.push(dataFromStore[time].v);
          }
        }
        subscriber.onSubscribe(() => {});
        subscriber.onComplete({
          data: JSON.stringify(dataToSend),
          metadata: null,
        });
      });
    }
  } else if (type === "history") {
    const { name } = params;
    if (name) {
      return new Single((subscriber) => {
        const data = store.getState().historyDataReducer[name];
        subscriber.onSubscribe(() => {});
        subscriber.onComplete({
          data,
          metadata: null,
        });
      });
    }
  }
}

module.exports = {
  handleRequestResponse,
};
