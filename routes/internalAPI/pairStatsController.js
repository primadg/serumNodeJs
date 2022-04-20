const response = require("../response");
const store = require("../../redux/store");

const getPairStatsData = (req, res) => {
  if (req?.query?.data) {
    const { data } = req.query;
    if (data === "pairs") {
      let dataToSend = {};
      const data = store.getState().pairStatsDataReducer;
      if (!data) {
        dataToSend = { success: false, pairs: [] };
      } else {
        dataToSend = { success: true, pairs: data };
      }
      response.ok(dataToSend, res);
    } else response.not_found(res);
  } else response.not_found(res);
};

module.exports = { getPairStatsData };
