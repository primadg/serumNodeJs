//Helper for get all data.

const USE_MARKETS = require("../config/markets");
const { getHistory, getTVСhartData } = require("../routes/externalAPI/raydium");
const { getSerumData, getConnection } = require("../routes/externalAPI/serum");

const connection = getConnection();

const updateAllHistory = async () => {
  return new Promise(async (resolve) => {
    for (let i = 0; i < USE_MARKETS.length; i++) {
      const { address, programId, name } = USE_MARKETS[i];
      await new Promise((resolve) => {
        setTimeout(async () => {
          getHistory(address);
          resolve();
        }, 2000);
      });
    }
    resolve();
  });
};

const getChartsForResolution = async (resolution) => {
  return new Promise(async (resolve) => {
    for (let i = 0; i < USE_MARKETS.length; i++) {
      const { address, programId, name } = USE_MARKETS[i];
      await new Promise(async (resolve) => {
        setTimeout(async () => {
          await getTVСhartData(address, name, resolution);
          resolve();
        }, 2000);
      });
    }
    resolve();
  });
};

const getAllHistory = async () => {
  let isResponse = false;
  setInterval(async () => {
    if (isResponse) {
      await new Promise(async (resolve) => {
        let interval = setInterval(async () => {
          if (!isResponse) {
            clearInterval(interval);
            isResponse = true;
            await updateAllHistory();
            isResponse = false;
            resolve();
          }
        }, 5222);
      });
    } else {
      isResponse = true;
      await updateAllHistory();
      isResponse = false;
    }
  }, 100000);
};

const getAllCharts = async () => {
  const resolutions = ["5min", "15min", "1h", "2h", "4h", "1d"];
  let isResponse = false;
  for (let i = 0; i < resolutions.length; i++) {
    isResponse = true;
    await getChartsForResolution(resolutions[i]);
    isResponse = false;
  }
  setInterval(async () => {
    if (isResponse) {
      await new Promise(async (resolve) => {
        let interval = setInterval(async () => {
          if (!isResponse) {
            clearInterval(interval);
            isResponse = true;
            await getChartsForResolution(resolutions[2]);
            await getChartsForResolution(resolutions[3]);
            await getChartsForResolution(resolutions[4]);
            await getChartsForResolution(resolutions[5]);
            isResponse = false;
            resolve();
          }
        }, 5000);
      });
    } else {
      isResponse = true;
      await getChartsForResolution(resolutions[2]);
      await getChartsForResolution(resolutions[3]);
      await getChartsForResolution(resolutions[4]);
      await getChartsForResolution(resolutions[5]);
      isResponse = false;
    }
  }, 60 * 60000);
  setInterval(async () => {
    if (isResponse) {
      await new Promise(async (resolve) => {
        let interval = setInterval(async () => {
          if (!isResponse) {
            clearInterval(interval);
            isResponse = true;
            await getChartsForResolution(resolutions[1]);
            isResponse = false;
            resolve();
          }
        }, 5000);
      });
    } else {
      isResponse = true;
      await getChartsForResolution(resolutions[1]);
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
            await getChartsForResolution(resolutions[0]);
            isResponse = false;
            resolve();
          }
        }, 5111);
      });
    } else {
      isResponse = true;
      await getChartsForResolution(resolutions[0]);
      isResponse = false;
    }
  }, 5 * 60000);
};

const getAllOrderbook = async () => {
  for (let i = 0; i < USE_MARKETS.length; i++) {
    const { address, programId, name } = USE_MARKETS[i];
    await new Promise((resolve) => {
      setTimeout(async () => {
        await getSerumData(connection, address, programId, name);
        resolve();
      }, 1000);
    });
  }
};

module.exports = { getAllHistory, getAllCharts, getAllOrderbook };
