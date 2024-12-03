import React, { useEffect, useState } from "react";
import { IconSend, IconCopy, IconLoader } from "@tabler/icons-react";
import "tailwindcss/tailwind.css";

const SettingsPage = () => {
  const [isToneBoxEnabled, setIsToneBoxEnabled] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [suggestionText, setSuggestionText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const modelMap = {
    casual: "tunedModels/casually-5e123ifaah5h",
    formal: "tunedModels/formal-hpfoe9trlpus",
    flirty: "tunedModels/flirty-qa9368ui2ic9",
    professional: "tunedModels/professionalyf-3rjq5lslrozm",
    neutral: "tunedModels/neutral-empathetic-and-supportive-tone-h",
    romantic: "tunedModels/romantic-lgq72w26ux7q",
  };
  const API_BASE_URL = "https://generativelanguage.googleapis.com/v1beta/";
  const API_KEY = "AIzaSyBAE4jU_ykSZiHCkbaEhgk_5qtQoecFcIc";

  const getSelectedTone = () => localStorage.getItem("tone") || "casual";

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
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const generateSuggestion = async () => {
    if (!userInput.trim()) return;
    setIsLoading(true);

    const tone = getSelectedTone();
    const model = (modelMap as any)[tone];

    try {
      const response = await fetch(
        `${API_BASE_URL}${model}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: userInput,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();
      setSuggestionText(
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No suggestion generated. Try again!"
      );
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestionText("Error generating suggestion. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestionText).then(
      () => {
        setShowCopiedMessage(false);
        setTimeout(() => setShowCopiedMessage(true), 50);
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
              <IconLoader className="h-5 w-5 animate-spin" />
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
