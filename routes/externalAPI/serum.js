const { Connection, PublicKey } = require("@solana/web3.js");
const { Market } = require("@project-serum/serum");
const config = require("../../config/appConfig");
const store = require("../../redux/store");
const setOrderbookData = require("../../redux/Orderbook/action");
const API_URL = config.solanaQuickNodeURL;

function getConnection() {
  return new Connection(API_URL);
}

async function getSerumData(
  connection,
  address = new PublicKey("C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4"),
  id = new PublicKey("9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin"),
  name = "BTC/USDT"
) {
  const marketAddress = address;
  const programID = id;
  const market = await Market.load(connection, marketAddress, {}, programID);

  setInterval(async () => {
    const bids = await market.loadBids(connection);
    const asks = await market.loadAsks(connection);

    const bidsL2 = bids.getL2(20);
    const asksL2 = asks.getL2(20);
    store.dispatch(setOrderbookData({ bidsL2, asksL2 }, name));
    if (name === "BTC/USDT") console.log("isBids: ", !!bidsL2.length);
  }, 2000);
}

module.exports = {
  getSerumData,
  getConnection,
};
