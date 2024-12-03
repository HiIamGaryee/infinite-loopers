import React from "react";
import AppRouter from "./Router";
import { ToneProvider } from "./ToneContext";
import ToneSuggestionBox from "./ToneSuggestionBox";

const App = () => {
  return (
    <ToneProvider>
      <ToneSuggestionBox />
      <AppRouter />
    </ToneProvider>
  );
};

export default App;
