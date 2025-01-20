export function openExternalBrowser(url) {
  if (Office.context.ui.openBrowserWindow) {
    Office.context.ui.openBrowserWindow(url);
  } else {
    console.log("OpenBrowserWindow API is not supported on this platform.");
  }
}
