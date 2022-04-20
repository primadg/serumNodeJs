const { PAIRSTATS_DATA } = require("../types");

const pairStatsDataReducer = (state = [], action) => {
  switch (action.type) {
    case PAIRSTATS_DATA:
      return {
        ...state,
        [action.pair]: action.payload,
      };
    default:
      return state;
  }
};

module.exports = pairStatsDataReducer;
