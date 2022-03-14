//Getting data from Raydium
// const makeRequest = require("helpers/requestHelper");
const config = require("../../config/appConfig");
const makeRequest = require("../../helpers/requestHelper");
const store = require("../../redux/store");
const setChartData = require("../../redux/TV_charts/action");
const API_URL = config.raydiumAPIURL;
const last_TV_chart_dataURL = config.raydiumTWURL;

async function getHistory(market = "C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4") {
  let url = API_URL + market;
  let response = await makeRequest.makeRequest(url);
  console.log(response);
}

async function getTVСhartData(
  market = "C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4",
  name = "BTC/USDT",
  resolution = "1h",
  from_time = "1645616149",
  to_time = ""
) {
  if (to_time.length == 0) {
    to_time = Math.floor(Date.now() / 1000);
  }

  let url = last_TV_chart_dataURL + market + "&resolution=" + resolution + "&from_time=" + from_time + "&to_time=" + to_time.toString();
  let response;
  try {
    response = await makeRequest.makeRequest(url);
    store.dispatch(setChartData(response, name));
  } catch (error) {
    console.log(error);
  }
  // console.log("\n\r")
  //   console.log(response);
  // console.log(to_time.toString())
}

module.exports = {
    getHistory,
    getTVСhartData
};