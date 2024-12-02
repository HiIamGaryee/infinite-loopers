import React, { useEffect, useState } from "react";

const SettingsPage = () => {
  const [isToneBoxEnabled, setIsToneBoxEnabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [suggestionText, setSuggestionText] = useState("");

  useEffect(() => {
    // Retrieve the state from chrome.storage.local
    chrome.storage.local.get("toneBoxEnabled", (result) => {
      setIsToneBoxEnabled(result.toneBoxEnabled || false);
      console.log("Initial toneBoxEnabled state:", result.toneBoxEnabled);
    });
  }, []);

  const toggleToneBox = () => {
    const newState = !isToneBoxEnabled;
    setIsToneBoxEnabled(newState);
    chrome.storage.local.set({ toneBoxEnabled: newState }, () => {
      console.log("Tone box enabled state is set to:", newState);
    });
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        if (tab.id) {
          chrome.tabs.sendMessage(
            tab.id,
            { toneBoxEnabled: newState },
            (response) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Error sending message to tab:",
                  tab.id,
                  chrome.runtime.lastError
                );
              } else {
                console.log("Message sent to tab:", tab.id);
              }
            }
          );
        }
      });
    });
  };

  // Function to handle input changes and generate suggestions
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputText = event.target.value;
    setUserInput(inputText);
    console.log("User input in popup:", inputText);

    // Simulate API call or use the same logic as content script
    if (isToneBoxEnabled) {
      // Placeholder suggestion logic
      const suggestion = "Hello, this is a suggestion based on your input!";
      setSuggestionText(suggestion);
      console.log("Suggestion generated:", suggestion);
    } else {
      setSuggestionText("");
    }
  };

  // Function to apply the suggestion
  const applySuggestion = () => {
    setUserInput(suggestionText);
    setSuggestionText("");
    console.log("Suggestion applied:", suggestionText);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="tone-toggle" className="text-lg">
          Enable Tone Suggestions
        </label>
        <input
          id="tone-toggle"
          type="checkbox"
          checked={isToneBoxEnabled}
          onChange={toggleToneBox}
          className="toggle-switch"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-input" className="block text-lg mb-2">
          Type something:
        </label>
        <input
          id="user-input"
          type="text"
          value={userInput}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {suggestionText && (
          <div
            className="mt-2 p-2 bg-white border border-gray-300 shadow-md cursor-pointer"
            onClick={applySuggestion}
          >
            {suggestionText}
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
