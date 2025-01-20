const setItem = (key, value) => {
  console.log(key, value);
  OfficeRuntime.storage.setItem(key, JSON.stringify(value));
};

const getItem = async (key) => {
  const value = await OfficeRuntime.storage.getItem(key);
  console.log(value, key);
  return value && value !== "undefined" ? JSON.parse(value) : null;
};

const removeItem = (key) => {
  OfficeRuntime.storage.removeItem(key);
};

export { setItem, getItem, removeItem };
