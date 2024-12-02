let isToneBoxEnabled = false;
console.log("Content script loaded.");

// Listen for messages from the extension (e.g., popup)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.hasOwnProperty("toneBoxEnabled")) {
    isToneBoxEnabled = message.toneBoxEnabled;
    console.log("Tone suggestion state updated to:", isToneBoxEnabled);
  }
});

// Event listener for input events
document.addEventListener("input", (event) => {
  if (
    isToneBoxEnabled &&
    (event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement)
  ) {
    const userInput = event.target.value;
    console.log("User input detected:", userInput);

    // Send the input to the background script
    chrome.runtime.sendMessage(
      { type: "getSuggestion", text: userInput },
      (response) => {
        if (response && response.suggestion) {
          displaySuggestionBox(event.target, response.suggestion);
        }
      }
    );
  }
});

function displaySuggestionBox(inputElement, suggestionText) {
  let suggestionBox = document.getElementById("tone-suggestion-box");

  if (!suggestionBox) {
    suggestionBox = document.createElement("div");
    suggestionBox.id = "tone-suggestion-box";
    suggestionBox.className =
      "absolute z-50 p-2 bg-white border border-gray-300 shadow-md cursor-pointer max-w-xs break-words"; // Tailwind classes
    document.body.appendChild(suggestionBox);

    // Add click event to replace input content
    suggestionBox.addEventListener("click", () => {
      inputElement.value = suggestionText;
      suggestionBox.style.display = "none";
    });
  }

  suggestionBox.textContent = suggestionText;
  suggestionBox.style.display = "block";

  // Positioning logic
  requestAnimationFrame(() => {
    const rect = inputElement.getBoundingClientRect();
    const suggestionBoxHeight = suggestionBox.offsetHeight;

    // Calculate the position above the input field
    let topPosition = window.scrollY + rect.top - suggestionBoxHeight - 5; // 5px above the input

    // Check if there's enough space above; if not, position below
    if (topPosition < 0) {
      topPosition = window.scrollY + rect.bottom + 5; // 5px below the input
    }

    suggestionBox.style.top = `${topPosition}px`;
    suggestionBox.style.left = `${window.scrollX + rect.left}px`;
  });
}
