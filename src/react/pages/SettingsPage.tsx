import React from "react";
import { useToneContext } from "../components/ToneContext";

const SettingsPage = () => {
  const { isToneBoxEnabled, toggleToneBox } = useToneContext();

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
