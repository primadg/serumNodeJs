const response = require('../response')
const USE_MARKETS = require('../../config/markets');


const getMarketInfo = (req, res) => {
  if (req?.query?.market) {
    const { market } = req.query;
    const isValidName = USE_MARKETS.find((el) => el.name === market)
    if (isValidName) {
      const { address, name } = isValidName
      const data = {
        "has_intraday": true,
        "listed_exchange": "",
        "minmov": 1,
        "pricescale": 10,
        "session": "24x7",
        "supported_resolutions": [
            "5",
            "15",
            "60",
            "120",
            "240",
            "1D"
        ],
        "timezone": "Etc/UTC",
        "type": "Spot",
        "out_count": 10000,
        "name": name,
        "description": name,
        "ticker": name,
        "tick_size": 1,
        "market": address,
        "base_name": [
          name
        ],
        "legs": [
          name
        ],
        "full_name": name,
        "pro_name": name,
        "data_status": "streaming"
      }
      response.ok(data, res)
    } else response.not_found(res)
  } else response.not_found(res)
}
  
module.exports = {getMarketInfo}