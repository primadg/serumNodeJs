const { HISTORY_DATA } = require("../types");

const historyDataReducer = (state = [], action) => {
  switch (action.type) {
    case HISTORY_DATA:
      return {
        ...state,
        [action.pair]: action.payload,
      };
    default:
      return state;
  }
};

module.exports = historyDataReducer;
