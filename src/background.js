chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed.");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "broadcastMessage") {
    // Forward the message to all tabs
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(tab.id, request.message, (response) => {
            if (chrome.runtime.lastError) {
              console.error(
                `Error in tab ${tab.id}:`,
                chrome.runtime.lastError
              );
            } else {
              console.log(`Response from tab ${tab.id}:`, response);
            }
          });
        }
      });
    });
    sendResponse({ status: "broadcast sent" });
  }
});
