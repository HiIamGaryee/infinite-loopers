// // contentScript.js
// document.body.addEventListener("input", function (event) {
//   // Check if the event is from an input or textarea element
//   if (
//     event.target.tagName.toLowerCase() === "input" ||
//     event.target.tagName.toLowerCase() === "textarea"
//   ) {
//     // Optional: Check if the input type is text-based (not checkbox, radio, etc.)
//     if (["text", "email", "password"].includes(event.target.type)) {
//       displaySuggestionBox(event.target);
//     }
//   }
// });

// function displaySuggestionBox(inputElement) {
//   // Create or reuse an existing suggestion box
//   let suggestionBox = document.getElementById("tone-suggestion-box");
//   if (!suggestionBox) {
//     suggestionBox = document.createElement("div");
//     suggestionBox.id = "tone-suggestion-box";
//     suggestionBox.style.position = "absolute";
//     suggestionBox.style.zIndex = "9999";
//     suggestionBox.style.backgroundColor = "#fff";
//     suggestionBox.style.border = "1px solid #ddd";
//     suggestionBox.style.padding = "10px";
//     suggestionBox.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
//     document.body.appendChild(suggestionBox);
//   }

//   // Position the suggestion box near the input element
//   const rect = inputElement.getBoundingClientRect();
//   suggestionBox.style.top = `${window.scrollY + rect.bottom + 5}px`; // 5px below the input
//   suggestionBox.style.left = `${window.scrollX + rect.left}px`;

//   // Set text and show the box
//   suggestionBox.textContent =
//     "Hello, this is a suggestion based on your input!";
//   suggestionBox.style.display = "block";

//   // Hide the box when the input field is blurred
//   inputElement.addEventListener("blur", function () {
//     suggestionBox.style.display = "none";
//   });
// }

// contentScript.js
let isToneBoxEnabled = false;

// Listen for messages to toggle the suggestion box state
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.hasOwnProperty("toneBoxEnabled")) {
    isToneBoxEnabled = message.toneBoxEnabled;
    console.log("Tone suggestion state updated to:", isToneBoxEnabled);
    toggleInputListeners(isToneBoxEnabled);
  }
});

// Toggle event listeners based on the tone box state
function toggleInputListeners(enabled) {
  document.querySelectorAll("input, textarea").forEach((element) => {
    element.removeEventListener("input", displayToneSuggestionBox);
    if (enabled) {
      element.addEventListener("input", displayToneSuggestionBox);
    }
  });
}

// Function to display a suggestion box near the input element
function displayToneSuggestionBox(event) {
  let suggestionBox = document.getElementById("tone-suggestion-box");
  if (!suggestionBox) {
    suggestionBox = document.createElement("div");
    suggestionBox.id = "tone-suggestion-box";
    suggestionBox.style.position = "absolute";
    suggestionBox.style.zIndex = "9999";
    suggestionBox.style.backgroundColor = "#fff";
    suggestionBox.style.border = "1px solid #ddd";
    suggestionBox.style.padding = "10px";
    suggestionBox.style.boxShadow = "0 2px 6px rgba(0,0,0,0.1)";
    document.body.appendChild(suggestionBox);
  }

  const rect = event.target.getBoundingClientRect();
  suggestionBox.style.top = `${window.scrollY + rect.bottom + 5}px`; // 5px below the input
  suggestionBox.style.left = `${window.scrollX + rect.left}px`;
  suggestionBox.textContent =
    "Hello, this is a suggestion based on your input!";
  suggestionBox.style.display = "block";

  // Hide the box when the input field is blurred
  event.target.addEventListener("blur", function () {
    suggestionBox.style.display = "none";
  });

  console.log("Displaying Tone Suggestion Box for:", event.target);
}

// Initial check on DOMContentLoaded to see if the tone box should be enabled
document.addEventListener("DOMContentLoaded", function () {
  chrome.storage.local.get(["toneBoxEnabled"], function (result) {
    if (result.toneBoxEnabled) {
      toggleInputListeners(true);
    }
  });
});
