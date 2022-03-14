const mainAction = (type, value, pair) => {
  return {
    type: type,
    payload: value,
    pair,
  };
};

module.exports = mainAction;
