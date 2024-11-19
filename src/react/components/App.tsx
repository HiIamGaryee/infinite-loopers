import React from "react";
import { ToneCard } from "./ToneCard";
import AppRouter from "./Router";

// const dogSrc: string =
//   "https://media.tenor.com/fej4_qoxdHYAAAAM/cute-puppy.gif";

// const generateDogGif = async () => {
//   const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
//   const activeTab = tabs[0];
//   chrome.tabs.sendMessage(activeTab.id || 0, dogSrc);
// };

const App = () => {
  return <AppRouter />;
};

export default App;
