const { CHART_DATA } = require("../types");

const chartDataReducer = (state = [], action) => {
  switch (action.type) {
    case CHART_DATA:
      return {
        ...state,
        [action.pair]: action.payload,
      };
    default:
      return state;
  }
};

module.exports = chartDataReducer;
