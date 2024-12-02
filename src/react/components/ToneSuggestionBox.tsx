import React, { useEffect, useState } from "react";

const ToneSuggestionBox = () => {
  const [isToneBoxEnabled, setToneBoxEnabled] = useState(false);
  const [suggestionText, setSuggestionText] = useState(
    "Hello, this is a suggestion based on your input!"
  );
  const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });
  useEffect(() => {
    const handleInput = (event: any) => {
      console.log("Input event detected");
      if (isToneBoxEnabled) {
        alert("Tone box enabled and input detected!");
      }
    };

    window.addEventListener("input", handleInput);
    return () => window.removeEventListener("input", handleInput);
  }, [isToneBoxEnabled]);

  useEffect(() => {
    // Function to handle messages from the popup
    const handleMessage = (request: any, sender: any, sendResponse: any) => {
      if (request.toneBoxEnabled !== undefined) {
        setToneBoxEnabled(request.toneBoxEnabled);
      }
    };

    chrome.runtime.onMessage.addListener(handleMessage);

    // Cleanup function to remove message listener
    return () => {
      chrome.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    const handleInput = (event: any) => {
      if (
        isToneBoxEnabled &&
        (event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement)
      ) {
        const rect = event.target.getBoundingClientRect();
        setBoxPosition({
          top: window.scrollY + rect.top + rect.height + 5, // Position below the input field
          left: window.scrollX + rect.left, // Align with the start of the input field
        });
        // Activate the suggestion
      }
    };

    window.addEventListener("input", handleInput);
    return () => window.removeEventListener("input", handleInput);
  }, [isToneBoxEnabled]);

  return isToneBoxEnabled ? (
    <div
      style={{
        position: "absolute",
        top: `${boxPosition.top}px`,
        left: `${boxPosition.left}px`,
        zIndex: 1000,
        padding: "8px",
        background: "white",
        border: "1px solid black",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        display: isToneBoxEnabled ? "block" : "none",
      }}
    >
      <p>{suggestionText}</p>
    </div>
  ) : null;
};

export default ToneSuggestionBox;
