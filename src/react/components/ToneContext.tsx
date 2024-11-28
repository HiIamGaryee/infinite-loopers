import React, { createContext, useContext, useState, ReactNode } from "react";

interface ToneContextType {
  isToneBoxEnabled: boolean;
  toggleToneBox: () => void;
  suggestionText: string;
  activateSuggestion: (text: string) => void;
}

const ToneContext = createContext<ToneContextType | undefined>(undefined);

export const useToneContext = () => {
  const context = useContext(ToneContext);
  if (!context) {
    throw new Error("useToneContext must be used within a ToneProvider");
  }
  return context;
};

export const ToneProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isToneBoxEnabled, setIsToneBoxEnabled] = useState(false);
  const [suggestionText, setSuggestionText] = useState("");

  const toggleToneBox = () => setIsToneBoxEnabled((prev) => !prev);
  const activateSuggestion = (text: string) => setSuggestionText(text);

  return (
    <ToneContext.Provider
      value={{
        isToneBoxEnabled,
        toggleToneBox,
        suggestionText,
        activateSuggestion,
      }}
    >
      {children}
    </ToneContext.Provider>
  );
};
