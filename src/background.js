// background.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "getSuggestion") {
    // Placeholder for API call
    const userInput = request.text;
    console.log("Received input:", userInput);

    // Simulate API response
    const suggestion = "Hello, this is a suggestion based on your input!";
    sendResponse({ suggestion });

    // If making an actual API call, use fetch:
    /*
      fetch("https://your-api-endpoint.com/suggest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: userInput })
      })
        .then((response) => response.json())
        .then((data) => {
          sendResponse({ suggestion: data.suggestion });
        })
        .catch((error) => {
          console.error("API error:", error);
          sendResponse({ suggestion: "" });
        });
      return true; // Keep the messaging channel open for sendResponse
      */
  }
});
