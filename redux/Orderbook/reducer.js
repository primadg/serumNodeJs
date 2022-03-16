const { ORDERBOOK_DATA } = require("../types");

const orderbookDataReducer = (state = [], action) => {
  switch (action.type) {
    case ORDERBOOK_DATA:
      return {
        ...state,
        [action.pair]: action.payload,
      };
    default:
      return state;
  }
};

module.exports = orderbookDataReducer;
