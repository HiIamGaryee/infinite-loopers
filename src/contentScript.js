let isToneBoxEnabled = false;

console.log("Content script loaded.");

// Update state based on messages from background/popup
chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "toggleToneBox") {
    isToneBoxEnabled = message.enabled;
    console.log("Tone box state updated:", isToneBoxEnabled);
  }
});

// Listen for focus events on input/textarea fields
document.addEventListener(
  "focus",
  (event) => {
    if (
      isToneBoxEnabled &&
      (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement)
    ) {
      console.log("Input field focused:", event.target);

      // Optional: Handle initial suggestion on focus if needed
      const userInput = event.target.value;
      chrome.runtime.sendMessage(
        { type: "getSuggestion", text: userInput },
        (response) => {
          if (response?.suggestion) {
            displaySuggestionBox(event.target, response.suggestion);
          }
        }
      );
    }
  },
  true
); // Use capture phase to ensure focus events are caught

// Listen for input events on text fields
document.addEventListener("input", (event) => {
  if (
    isToneBoxEnabled &&
    (event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement)
  ) {
    const userInput = event.target.value;

    // Send input to background for processing
    chrome.runtime.sendMessage(
      { type: "getSuggestion", text: userInput },
      (response) => {
        if (response?.suggestion) {
          displaySuggestionBox(event.target, response.suggestion);
        }
      }
    );
  }
});

function displaySuggestionBox(inputElement, suggestionText) {
  let suggestionBox = document.getElementById("tone-suggestion-box");

  // Remove existing suggestion box
  if (suggestionBox) suggestionBox.remove();

  // Create a new suggestion box
  suggestionBox = document.createElement("div");
  suggestionBox.id = "tone-suggestion-box";
  suggestionBox.textContent = suggestionText;
  suggestionBox.className = "tone-suggestion-box"; // Tailwind for styling
  document.body.appendChild(suggestionBox);

  // Position the suggestion box
  const rect = inputElement.getBoundingClientRect();
  suggestionBox.style.position = "absolute";
  suggestionBox.style.top = `${window.scrollY + rect.bottom + 5}px`;
  suggestionBox.style.left = `${window.scrollX + rect.left}px`;

  // Replace input text when suggestion is clicked
  suggestionBox.addEventListener("click", () => {
    inputElement.value = suggestionText;
    suggestionBox.remove();
  });
}
