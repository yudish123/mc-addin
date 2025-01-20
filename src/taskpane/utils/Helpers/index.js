export const genUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const isExcelCellAddress = (address) => {
  const cellAddressRegex = /^(?:[A-W]{1,2}|X[A-E]?|XF[0-D])\d+$/;
  return cellAddressRegex.test(address);
};

export const isExcelCellRange = (address) => {
  const cellRangeRegex = /^(?:[A-W]{1,2}|X[A-E]?|XF[0-D])\d+(?::(?:[A-W]{1,2}|X[A-E]?|XF[0-D])\d+)?$/;
  return cellRangeRegex.test(address);
};

export function expandRange(start, end) {
  const startCol = start.match(/[A-Z]+/)[0];
  const startRow = parseInt(start.match(/\d+/)[0], 10);
  const endCol = end.match(/[A-Z]+/)[0];
  const endRow = parseInt(end.match(/\d+/)[0], 10);
  const cells = [];
  for (let col = startCol.charCodeAt(0); col <= endCol.charCodeAt(0); col++) {
    for (let row = startRow; row <= endRow; row++) {
      cells.push(`${String.fromCharCode(col)}${row}`);
    }
  }
  return cells;
}

export const getPathName = (path) => {
  switch (path) {
    case "/chat":
      return "chat";
    case "/pricing":
      return "Plans";
    case "/billing":
      return "Account Settings";
    case "/upload-document":
      return "Upload Docs";
    case "/bug-report":
      return "Bug Report";
    case "/settings":
      return "Settings";
    default:
      return "Home";
  }
};

export const getPlanNameFromUser = (user) => {
  return user.plan_type.split("-")[0];
};

export const getPlanCycleFromUser = (user) => {
  return user.plan_type.split("-")[1];
};
