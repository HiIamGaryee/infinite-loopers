document.addEventListener("DOMContentLoaded", () => {
  const switchElement = document.getElementById("toggle-switch");

  // Load the current state from storage
  chrome.storage.local.get(["toneBoxEnabled"], (result) => {
    switchElement.checked = result.toneBoxEnabled || false; // Default to false if undefined
  });

  // Listen for toggle changes
  switchElement.addEventListener("change", function () {
    const newState = this.checked;
    chrome.storage.local.set({ toneBoxEnabled: newState }, () => {
      console.log("Tone box enabled state is set to:", newState);
    });

    // Send message to the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          { type: "toggleToneBox", enabled: newState },
          (response) => {
            if (chrome.runtime.lastError) {
              console.error("Error sending message:", chrome.runtime.lastError);
            } else {
              console.log("Response from content script:", response);
            }
          }
        );
      }
    });
  });
});
