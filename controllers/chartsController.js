const response = require('../routes/response')
const store = require('../redux/store')


const getChart = (req, res) => {
    if(req.query) {
      const { name, resolution, from, to } = req.query;
      const dataFromStore = store.getState().chartDataReducer?.[name]?.[resolution];
          let dataToSend = {
            c: [],
            h: [],
            l: [],
            o: [],
            t: [],
            v: [],
            s: "ok",
          };
          if (dataFromStore) {
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
          } else {
            dataToSend.c.push(0);
            dataToSend.h.push(0);
            dataToSend.l.push(0);
            dataToSend.o.push(0);
            dataToSend.t.push(to);
            dataToSend.v.push(0);
            dataToSend.s = 'fail to load data'
          }
        if (dataToSend) {
        response.ok(dataToSend, res)
        } else response.not_found(res)
    }
  }
  
  module.exports = {getChart}