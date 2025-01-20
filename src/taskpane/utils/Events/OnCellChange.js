export const addOnCellChange = async (event, callback) => {
  await Excel.run(async (context) => {
    const worksheet = context.workbook.worksheets.getActiveWorksheet();
    event = worksheet.onSelectionChanged.add(callback);

    await context.sync();
    console.log("Event handler successfully registered for onChanged event in the worksheet.");
  });
};

export const removeOnCellChange = async (event) => {
  Excel.run(async (context) => {
    event.remove();
    await context.sync();
  }).catch((err) => console.log("Error removing event handler for onChanged event in the worksheet.", err));
};
