//Getting data from Raydium
const config = require("../../config/appConfig");
const makeRequest = require("../../helpers/requestHelper");
const store = require("../../redux/store");
const setChartData = require("../../redux/TV_charts/action");
const setHistoryData = require("../../redux/History/action");
const setPairStatsData = require("../../redux/PairStats/action");
const API_URL = config.raydiumAPIURL;
const last_TV_chart_dataURL = config.raydiumTWURL;

async function getHistory(market = "C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4", name = "BTC/USDT", debug) {
  let url = API_URL + market;
  let response;
  try {
    response = await makeRequest.makeRequest(url);
    store.dispatch(setHistoryData(response, name));
    buildPairStatsData(response, name);
    if (debug) console.log("History success: ", JSON.parse(response)?.success);
  } catch (error) {
    console.log(error);
  }
}

async function getTVСhartData(market = "C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4", name = "BTC/USDT", resolution = "1h", debug) {
  const to_time = Math.floor(Date.now() / 1000);
  let from_time;
  if (resolution === "5min") {
    from_time = to_time - 300000;
  }
  if (resolution === "15min") {
    from_time = to_time - 900000;
  }
  if (resolution === "1h") {
    from_time = to_time - 3600000;
  }
  if (resolution === "2h") {
    from_time = to_time - 7200000;
  }
  if (resolution === "4h") {
    from_time = to_time - 14000000;
  }
  if (resolution === "1d") {
    from_time = to_time - 28000000;
  }

  let url = last_TV_chart_dataURL + market + "&resolution=" + resolution + "&from_time=" + from_time + "&to_time=" + to_time;
  let response;
  try {
    response = await makeRequest.makeRequest(url);
    const parsedData = JSON.parse(response);
    const incomeData = { [resolution]: {} };
    if (parsedData.s === "ok") {
      parsedData.t.forEach((el, i) => {
        const c = parsedData.c[i];
        const h = parsedData.h[i];
        const l = parsedData.l[i];
        const o = parsedData.o[i];
        const t = el;
        const v = parsedData.v[i];
        incomeData[resolution][el] = {
          c,
          h,
          l,
          o,
          t,
          v,
        };
      });
    }
    const currentData = store.getState().chartDataReducer[name];
    const dataToSave = { ...currentData, ...incomeData };
    store.dispatch(setChartData(dataToSave, name));
    if (debug) console.log("Chart success: ", parsedData.s);
  } catch (error) {
    console.log(error);
  }
}

function buildPairStatsData(response, name) {
  const pairStatsData = {};
  const DAY = 86400;
  const parsedResponse = JSON.parse(response);
  const dataFromStore = store.getState().chartDataReducer?.[name]?.["5min"];
  const currentTime = Math.floor(Date.now() / 1000);
  const requiredTime = currentTime - DAY;
  let difference = 0;
  let closestIndex = 0;
  let high = 0;
  let low = Infinity;
  let dataToSend = {
    c: [],
    h: [],
    l: [],
    t: [],
  };
  if (dataFromStore) {
    for (let time in dataFromStore) {
      dataToSend.c.push(dataFromStore[time].c);
      dataToSend.h.push(dataFromStore[time].h);
      dataToSend.l.push(dataFromStore[time].l);
      dataToSend.t.push(dataFromStore[time].t);
    }
  }
  dataToSend.t.forEach((el, i) => {
    const time = parseInt(el);
    const currentDifference = Math.abs(time - requiredTime);
    if (i === 0) {
      difference = currentDifference;
    } else if (currentDifference < difference) {
      difference = currentDifference;
      closestIndex = i;
    }
    if (time <= currentTime && time >= requiredTime) {
      if (dataToSend.h[i] > high) high = dataToSend.h[i];
      if (dataToSend.l[i] < low) low = dataToSend.l[i];
    }
  });
  const priceDayAgo = dataToSend.c[closestIndex] || 0;
  pairStatsData.lastPrice = parsedResponse?.data[parsedResponse?.data?.length - 1]?.price || priceDayAgo;
  pairStatsData.amountChange = pairStatsData.lastPrice - priceDayAgo;
  pairStatsData.percentChange = (priceDayAgo / pairStatsData.lastPrice - 1) * 100;
  pairStatsData.high = high;
  pairStatsData.low = low === Infinity ? 0 : low;
  store.dispatch(setPairStatsData(pairStatsData, name));
}

module.exports = {
  getHistory,
  getTVСhartData,
};
