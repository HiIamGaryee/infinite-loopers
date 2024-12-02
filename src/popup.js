document.addEventListener("DOMContentLoaded", function () {
  const switchElement = document.getElementById("toggle-switch");

  // Load the current state from storage
  chrome.storage.local.get(["toneBoxEnabled"], function (result) {
    switchElement.checked = result.toneBoxEnabled || false; // Default to false if undefined
  });

  // Listen for toggle changes
  switchElement.addEventListener("change", function () {
    const newState = this.checked;
    chrome.storage.local.set({ toneBoxEnabled: newState }, function () {
      console.log("Tone box enabled state is set to: " + newState);
    });
    // Send message to content scripts in all tabs
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id, { toneBoxEnabled: newState });
      });
    });
  });
});
