import React, { useEffect, useState } from "react";

const SettingsPage = () => {
  // Using local state initially set by the value in local storage or default to false
  const [isToneBoxEnabled, setIsToneBoxEnabled] = useState(() => {
    // Retrieve the state from local storage or default to false if not set
    const saved = localStorage.getItem("toneBoxEnabled");
    return saved === "true" ? true : false;
  });

  // Effect to store the state change in local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("toneBoxEnabled", isToneBoxEnabled.toString());
  }, [isToneBoxEnabled]);

  const toggleToneBox = () => {
    setIsToneBoxEnabled((prev) => !prev);
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
