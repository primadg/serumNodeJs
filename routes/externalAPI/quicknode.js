const web3 = require("@solana/web3.js");
const solana = new web3.Connection("https://rough-quiet-firefly.solana-mainnet.quiknode.pro/");

(async () => {
  const publicKey = new web3.PublicKey("C1EuT9VokAKLiW7i2ASnZUvxDoKuKkCpDDeNxAptuNe4");
  console.log(await solana.getAccountInfo(publicKey));
})();
