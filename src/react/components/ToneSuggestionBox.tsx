// ToneSuggestionBox.tsx
import React, { useEffect, useState } from "react";
import { useToneContext } from "./ToneContext";

const ToneSuggestionBox = () => {
  const { isToneBoxEnabled, suggestionText, activateSuggestion } =
    useToneContext();
  const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });

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
        activateSuggestion("Hello, this is a suggestion based on your input!");
      }
    };

    window.addEventListener("input", handleInput);
    return () => window.removeEventListener("input", handleInput);
  }, [isToneBoxEnabled, activateSuggestion]);

  return isToneBoxEnabled && suggestionText ? (
    <div
      style={{
        position: "absolute",
        top: `${boxPosition.top}px`,
        left: `${boxPosition.left}px`,
        zIndex: 1000, // Ensure it appears above other content
        padding: "8px",
        background: "white",
        border: "1px solid black",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <p>{suggestionText}</p>
    </div>
  ) : null;
};

export default ToneSuggestionBox;
