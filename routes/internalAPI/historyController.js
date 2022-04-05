const response = require('../response')
const store = require('../../redux/store')
const USE_MARKETS = require('../../config/markets');


const getHistory = (req, res) => {
  if (req?.query?.name) {
    const { name } = req.query;
    const isValidName = USE_MARKETS.find((el) => el.name === name)
    if (isValidName) {
      let data = store.getState().historyDataReducer[name];
      if (!data) {
        data = {success: false, data: []}  
      } else JSON.parse(data)
      response.ok(data, res)
    } else response.not_found(res)
  } else response.not_found(res)
}
  
module.exports = {getHistory}