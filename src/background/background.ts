chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    console.info("[AmozeshyarExporter] Extension installed successfully.");
  } else if (details.reason === "update") {
    console.info(
      "[AmozeshyarExporter] Extension updated to version",
      chrome.runtime.getManifest().version,
    );
  }
});

chrome.runtime.onMessage.addListener((_message, _sender, sendResponse) => {
  sendResponse({ ok: true });
  return false;
});

export {};
