import React from "react";
import { ToneCard } from "../components/ToneCard";

const HomePage = () => {
  return (
    <main className="main-box">
      <h1 className="text-center font-bold text-2xl">
        AI Emotional Intelligence Assistant Language
      </h1>

      {/* <img
    src={dogSrc}
    alt="Cute puppy gif"
    className="w-[200px] h-auto rounded-lg shadow-lg mb-4"
  />
  <button
    onClick={generateDogGif}
    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition mb-4"
  >
    Generate Dog Gif
  </button> */}

      <ToneCard />
    </main>
  );
};

export default HomePage;
