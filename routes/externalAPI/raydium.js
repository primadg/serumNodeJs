//Getting data from Raydium
const config = require("../../config/appConfig");
const makeRequest = require("../../helpers/requestHelper");
const store = require("../../redux/store");
const setChartData = require("../../redux/TV_charts/action");
const setHistoryData = require("../../redux/History/action");
const API_URL = config.raydiumAPIURL;
const last_TV_chart_dataURL = config.raydiumTWURL;

async function getHistory(market = "C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4", name = "BTC/USDT", debug) {
  let url = API_URL + market;
  let response;
  try {
    response = await makeRequest.makeRequest(url);
    store.dispatch(setHistoryData(response, name));
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

module.exports = {
  getHistory,
  getTVСhartData,
};
