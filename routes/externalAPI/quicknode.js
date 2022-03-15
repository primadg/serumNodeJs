const web3 = require("@solana/web3.js");
const store = require("../../redux/store");
const setChartData = require("../../redux/TV_charts/action");
const solana = new web3.Connection("https://rough-quiet-firefly.solana-mainnet.quiknode.pro/");

async function getTransactions() {
  const publicKey = new web3.PublicKey("C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4");
  const accountInfo = await solana.getAccountInfo(publicKey);
  //   store.dispatch(setChartData(accountInfo, 1));
  console.log(accountInfo.data.toString());
}

module.exports = { getTransactions };