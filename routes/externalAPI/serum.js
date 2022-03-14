const { Connection, PublicKey } = require("@solana/web3.js");
const { Market } = require("@project-serum/serum");
const config = require("../../config/appConfig");
const store = require("../../redux/store");
const setChartData = require("../../redux/TV_charts/action");
const API_URL = config.serumAPIURL;

async function getSerumData(
  address = new PublicKey("C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4"),
  id = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"),
  name = "BTC/USDT"
) {
  const connection = new Connection(API_URL);
  const marketAddress = address;
  const programID = id;
  const market = await Market.load(connection, marketAddress, {}, programID);

  setInterval(async () => {
    const bids = await market.loadBids(connection);
    const asks = await market.loadAsks(connection);
    // L2 orderbook data
    const bidsL2 = bids.getL2(20);
    const asksL2 = asks.getL2(20);
    store.dispatch(setChartData({ bidsL2, asksL2 }, name));
  }, 2000);
  // // Fetching orderbooks
  // const bids = await market.loadBids(connection);
  // const asks = await market.loadAsks(connection);
  // // L2 orderbook data
  // const bidsL2 = bids.getL2(20);
  // const asksL2 = asks.getL2(20);
  //   for (let [price, size] of bids.getL2(20)) {
  //     console.log(price, size);
  //   }
  // Full orderbook data
  // for (let order of asks) {
  //   console.log(
  //     order.orderId,
  //     order.price,
  //     order.size,
  //     order.side, // 'buy' or 'sell'
  //   );
  // }
  // store.dispatch(setChartData({ bidsL2, asksL2 }, name));
  // store.dispatch(setChartData(market));
}

module.exports = {
  getSerumData,
};
