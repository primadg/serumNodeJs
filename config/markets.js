const { MARKETS } = require("@project-serum/serum");

const USE_MARKETS = MARKETS.filter(({ deprecated }) => !deprecated);

module.exports = USE_MARKETS;
