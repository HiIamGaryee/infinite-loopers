import React, { createContext, useContext, useState, ReactNode } from "react";

// Define context type
interface ToneContextType {
  isToneBoxEnabled: boolean;
  toggleToneBox: () => void;
}

// Create Context
const ToneContext = createContext<ToneContextType | undefined>(undefined);

// Custom Hook to use the context
export const useToneContext = () => {
  const context = useContext(ToneContext);
  if (!context) {
    throw new Error("useToneContext must be used within a ToneProvider");
  }
  return context;
};

// Provider Component
export const ToneProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isToneBoxEnabled, setIsToneBoxEnabled] = useState(true);

  const toggleToneBox = () => {
    setIsToneBoxEnabled((prev) => !prev);
  };

  return (
    <ToneContext.Provider value={{ isToneBoxEnabled, toggleToneBox }}>
      {children}
    </ToneContext.Provider>
  );
};
