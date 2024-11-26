import React, { useState, useEffect } from "react";
import { useToneContext } from "./ToneContext";

const ToneSuggestionBox = () => {
  const { isToneBoxEnabled } = useToneContext(); // Get toggle state from context
  const [showBox, setShowBox] = useState(false);
  const [suggestion, setSuggestion] = useState("Hello"); // Mocked suggestion
  const [activeInput, setActiveInput] = useState<HTMLElement | null>(null);
  const [boxPosition, setBoxPosition] = useState({ top: 0, left: 0 });

  // Function to handle focus and input events
  const handleFocusInput = (e: FocusEvent) => {
    if (!isToneBoxEnabled) return; // Exit if the ToneSuggestionBox is disabled

    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
      setActiveInput(target);

      // Get the position of the input field
      const rect = target.getBoundingClientRect();
      setBoxPosition({
        top: rect.bottom + window.scrollY + 5, // Position below the input
        left: rect.left + window.scrollX, // Align left with input
      });

      setShowBox(true);
    } else {
      setShowBox(false);
    }
  };

  const handleSuggestionClick = () => {
    if (activeInput) {
      if ((activeInput as HTMLInputElement).value !== undefined) {
        (activeInput as HTMLInputElement).value = suggestion; // Replace input value
      } else if ((activeInput as HTMLTextAreaElement).value !== undefined) {
        (activeInput as HTMLTextAreaElement).value = suggestion; // Replace textarea value
      }
    }
    setShowBox(false); // Hide the suggestion box
  };

  useEffect(() => {
    if (isToneBoxEnabled) {
      document.addEventListener("focusin", handleFocusInput);
    } else {
      // Cleanup listener when the feature is disabled
      document.removeEventListener("focusin", handleFocusInput);
      setShowBox(false); // Hide the box if toggled off
    }

    // Cleanup when the component is unmounted
    return () => {
      document.removeEventListener("focusin", handleFocusInput);
    };
  }, [isToneBoxEnabled]);

  if (!isToneBoxEnabled) return null; // Don't render the component if disabled

  return (
    <>
      {showBox && (
        <div
          style={{
            position: "absolute",
            top: `${boxPosition.top}px`,
            left: `${boxPosition.left}px`,
            backgroundColor: "white",
            border: "1px solid gray",
            borderRadius: "8px",
            padding: "8px",
            zIndex: 1000,
          }}
          className="shadow-lg"
        >
          <p
            className="cursor-pointer text-blue-500"
            onClick={handleSuggestionClick}
          >
            {suggestion}
          </p>
        </div>
      )}
    </>
  );
};

export default ToneSuggestionBox;
