import React, { useEffect, useState } from "react";
import { IconSend, IconCopy, IconLoader } from "@tabler/icons-react";
import "tailwindcss/tailwind.css";

const SettingsPage = () => {
  const [isToneBoxEnabled, setIsToneBoxEnabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false); // For copied animation

  useEffect(() => {
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

  const handleInputChange = (event: any) => {
    const inputText = event.target.value;
    setUserInput(inputText);
  };

  const generateSuggestion = () => {
    if (!userInput.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      const suggestion = "Hello, this is a suggestion based on your input!";
      setSuggestionText(suggestion);
      console.log("Suggestion generated:", suggestion);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestionText).then(
      () => {
        console.log("Suggestion copied to clipboard");
        setShowCopiedMessage(false); // Reset animation
        setTimeout(() => setShowCopiedMessage(true), 50); // Trigger animation
      },
      (err) => {
        console.error("Could not copy text: ", err);
      }
    );
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">
        AI Emotional Intelligence Assistant
      </h1>
      <div className="flex items-center justify-between mb-6">
        <label htmlFor="tone-toggle" className="text-lg">
          Enable Tone Suggestions
        </label>
        <input
          id="tone-toggle"
          className="toggle-switch"
          type="checkbox"
          checked={isToneBoxEnabled}
          onChange={toggleToneBox}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="user-input" className="block text-lg mb-2">
          Type something:
        </label>
        <div className="flex items-center">
          <input
            id="user-input"
            type="text"
            value={userInput}
            onChange={handleInputChange}
            className="flex-grow p-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generateSuggestion}
            disabled={!isToneBoxEnabled || isLoading}
            className={`p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-r-md focus:outline-none ${
              !isToneBoxEnabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <IconLoader className="h-5 w-5" />
            ) : (
              <IconSend className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {suggestionText && (
        <div className="mb-6">
          <table className="min-w-full bg-white border rounded-md">
            <tbody>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {suggestionText}
                </td>
                <td className="px-6 py-4 text-right text-sm">
                  <button
                    onClick={copyToClipboard}
                    className="text-blue-600 hover:text-blue-800 focus:outline-none"
                  >
                    <IconCopy className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {showCopiedMessage && (
        <div className="text-green-500 text-sm animate-fade-out">
          Copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
