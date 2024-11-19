// App.tsx
import React from "react";
import { ToneCard } from "./ToneCard";
import { IconPrinter } from "@tabler/icons-react";
const dogSrc: string =
  "https://media.tenor.com/fej4_qoxdHYAAAAM/cute-puppy.gif";

const generateDogGif = async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id || 0, dogSrc);
};

const App = () => {
  return (
    <main className="main-box">
      <h1 className="text-center font-bold text-2xl">Generate Dog Gif</h1>
      <img
        src={dogSrc}
        alt="Cute puppy gif"
        className="w-[200px] h-auto rounded-lg shadow-lg mb-4"
      />
      <button
        onClick={generateDogGif}
        className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition mb-4"
      >
        Generate Dog Gif
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ToneCard
          colorClass="tone-card-purple"
          text="Happy"
          icon={<IconPrinter />}
        />
        <ToneCard
          colorClass="tone-card-orange"
          text="Sad"
          icon={<IconPrinter />}
        />
        <ToneCard
          colorClass="tone-card-pink"
          text="Flirt"
          icon={<IconPrinter />}
        />
        <ToneCard
          colorClass="tone-card-blue"
          text="Doggie"
          icon={<IconPrinter />}
        />
        <ToneCard
          colorClass="tone-card-yellow"
          text="Formal"
          icon={<IconPrinter />}
        />
        <ToneCard
          colorClass="tone-card-green"
          text="Man"
          icon={<IconPrinter />}
        />
      </div>
    </main>
  );
};

export default App;
