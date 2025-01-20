const isCacheEnabled = async () => {
  try {
    const cacheState = await OfficeRuntime.storage.getItem("cacheState");
    if (cacheState === null) return true;
    return cacheState === "true";
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getCacheData = async (address) => {
  const token = await OfficeRuntime.storage.getItem("accessToken");
  console.log(token);
  if (!token) return null;
  const cacheState = await OfficeRuntime.storage.getItem(address);
  return JSON.parse(cacheState);
};

const setCacheData = async (address, data) => {
  await OfficeRuntime.storage.setItem(address, JSON.stringify(data));
};

module.exports = {
  isCacheEnabled,
  getCacheData,
  setCacheData,
};
