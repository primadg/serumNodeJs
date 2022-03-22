//Helper for get all data.

const USE_MARKETS = require("../config/markets");
const { getHistory, getTVСhartData } = require("../routes/externalAPI/raydium");
const { getSerumData, getConnection } = require("../routes/externalAPI/serum");

const connection = getConnection();

const updateAllHistory = async (debug) => {
  return new Promise(async (resolve) => {
    for (let i = 0; i < USE_MARKETS.length; i++) {
      const { address, programId, name } = USE_MARKETS[i];
      await new Promise((resolve) => {
        setTimeout(async () => {
          getHistory(address, name, debug);
          resolve();
        }, 2000);
      });
    }
    resolve();
  });
};

const getChartsForResolution = async (resolution, debug) => {
  return new Promise(async (resolve) => {
    for (let i = 0; i < USE_MARKETS.length; i++) {
      const { address, programId, name } = USE_MARKETS[i];
      await new Promise(async (resolve) => {
        setTimeout(async () => {
          await getTVСhartData(address, name, resolution, debug);
          resolve();
        }, 2000);
      });
    }
    resolve();
  });
};

const getAllHistory = async (debug) => {
  let isResponse = false;
  setInterval(async () => {
    if (isResponse) {
      await new Promise(async (resolve) => {
        let interval = setInterval(async () => {
          if (!isResponse) {
            clearInterval(interval);
            isResponse = true;
            await updateAllHistory(debug);
            isResponse = false;
            resolve();
          }
        }, 5222);
      });
    } else {
      isResponse = true;
      await updateAllHistory(debug);
      isResponse = false;
    }
  }, 100000);
};

const getAllCharts = async (debug) => {
  const resolutions = ["5min", "15min", "1h", "2h", "4h", "1d"];
  let isResponse = false;
  for (let i = 0; i < resolutions.length; i++) {
    isResponse = true;
    await getChartsForResolution(resolutions[i], debug);
    isResponse = false;
  }
  setInterval(async () => {
    if (isResponse) {
      await new Promise(async (resolve) => {
        let interval = setInterval(async () => {
          if (!isResponse) {
            clearInterval(interval);
            isResponse = true;
            await getChartsForResolution(resolutions[2], debug);
            await getChartsForResolution(resolutions[3], debug);
            await getChartsForResolution(resolutions[4], debug);
            await getChartsForResolution(resolutions[5], debug);
            isResponse = false;
            resolve();
          }
        }, 5000);
      });
    } else {
      isResponse = true;
      await getChartsForResolution(resolutions[2], debug);
      await getChartsForResolution(resolutions[3], debug);
      await getChartsForResolution(resolutions[4], debug);
      await getChartsForResolution(resolutions[5], debug);
      isResponse = false;
    }
  }, 30 * 60000);
  setInterval(async () => {
    if (isResponse) {
      await new Promise(async (resolve) => {
        let interval = setInterval(async () => {
          if (!isResponse) {
            clearInterval(interval);
            isResponse = true;
            await getChartsForResolution(resolutions[1], debug);
            isResponse = false;
            resolve();
          }
        }, 5000);
      });
    } else {
      isResponse = true;
      await getChartsForResolution(resolutions[1], debug);
      isResponse = false;
    }
  }, 15 * 60000);
  setInterval(async () => {
    if (isResponse) {
      await new Promise(async (resolve) => {
        let interval = setInterval(async () => {
          if (!isResponse) {
            clearInterval(interval);
            isResponse = true;
            await getChartsForResolution(resolutions[0], debug);
            isResponse = false;
            resolve();
          }
        }, 5111);
      });
    } else {
      isResponse = true;
      await getChartsForResolution(resolutions[0], debug);
      isResponse = false;
    }
  }, 5 * 60000);
};

const getAllOrderbook = async (debug) => {
  for (let i = 0; i < USE_MARKETS.length; i++) {
    const { address, programId, name } = USE_MARKETS[i];
    await new Promise((resolve) => {
      setTimeout(async () => {
        await getSerumData(connection, address, programId, name, debug);
        resolve();
      }, 1000);
    });
  }
};

module.exports = { getAllHistory, getAllCharts, getAllOrderbook };
