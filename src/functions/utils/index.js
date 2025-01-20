const { config } = require("../../env");
const { BASE_URL } = config;

function processOutputFormat(data, output_format) {
  if (!output_format || output_format === 0) {
    return [[data.value]] ?? "No data received";
  } else if (output_format === 1) {
    const headers = data.value.map((value) => [value]);
    return headers ?? "No data received";
  } else if (output_format === 2) {
    return [data.value ?? "No data received"];
  } else {
    const headers = data["series"];
    const rows = headers.map((header) => data[header]);
    const resultArray = [headers, ...rows[0].map((_, i) => rows.map((row) => row[i]))];
    console.log(resultArray);
    return resultArray;
  }
}

async function logMessageWithCellAddress(messages, address) {
  const context = new Excel.RequestContext();
  let comments = context.workbook.comments;

  try {
    //delete existing comment
    const sheet = context.workbook.worksheets.getActiveWorksheet();
    const existingComment = sheet.comments.getItemByCell(address);
    existingComment.load();
    await context.sync();

    if (!existingComment.isNullObject) {
      existingComment.delete();
      existingComment.content = `${messages.join("\n\n")}`;
    }
    console.log("yes existing comment");
    await context.sync();
  } catch (error) {
    console.log("no existing comment");
    const activeCell = context.workbook.getActiveCell();
    comments.add(`${address}`, `${messages.join("\n\n")}`);
    activeCell.load("comments");
    await context.sync();
  }
}

module.exports = {
  BASE_URL,
  processOutputFormat,
  logMessageWithCellAddress,
};
