/*
 * Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
 * See LICENSE in the project root for license information.
 */

/* global console, Excel, Office */

// The initialize function must be run each time a new page is loaded
Office.onReady(() => {
  // document.getElementById("sideload-msg")?.style?.display = "none";
  // document.getElementById("app-body")?.style?.display = "flex";
  // async function checkForMessage() {
  //   console.log("checkForMessage");
  //   const message = await OfficeRuntime.storage.getItem("comments");
  //   console.log(message);
  //   if (message) {
  //     // Perform an action, such as adding a comment
  //     await Excel.run(async (context) => {
  //       const activeCell = context.workbook.getActiveCell();
  //       activeCell.comments.add(message);
  //       await context.sync();
  //     });
  //     // Clear the message after processing
  //     await OfficeRuntime.storage.removeItem("comments");
  //   }
  // }
  // You can set an interval to periodically check for new messages
  // setInterval(checkForMessage, 1000); // Poll every 5 seconds
});

export async function run() {
  try {
    await Excel.run(async (context) => {
      /**
       * Insert your Excel code here
       */
      const range = context.workbook.getSelectedRange();

      // Read the range address
      range.load("address");

      // Update the fill color
      range.format.fill.color = "yellow";

      await context.sync();
      console.log(`The range address was ${range.address}.`);
    });
  } catch (error) {
    console.error(error);
  }
}
