import React, { useEffect, useState } from "react";

const SettingsPage = () => {
  const [isToneBoxEnabled, setIsToneBoxEnabled] = useState(false);

  useEffect(() => {
    // Retrieve the state from chrome.storage.local
    chrome.storage.local.get("toneBoxEnabled", (result) => {
      setIsToneBoxEnabled(result.toneBoxEnabled || false);
    });
  }, []);

  const toggleToneBox = () => {
    const newState = !isToneBoxEnabled;
    setIsToneBoxEnabled(newState);
    chrome.storage.local.set({ toneBoxEnabled: newState });
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach((tab) => {
        if (typeof tab.id !== "undefined") {
          chrome.tabs.sendMessage(tab.id, { toneBoxEnabled: newState });
        }
      });
    });
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
    </div>
  );
};

export default SettingsPage;
