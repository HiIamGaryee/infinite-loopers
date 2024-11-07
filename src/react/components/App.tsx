import { ToneCard } from "./ToneCard";

const dogSrc: string =
  "https://media.tenor.com/fej4_qoxdHYAAAAM/cute-puppy.gif";

const generateDogGif = async () => {
  // Get the active tab
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const activeTab = tabs[0];
  // Send the dog Gif
  chrome.tabs.sendMessage(activeTab.id || 0, dogSrc);
};

const App = () => {
  return (
    <main className="main-box">
      <h1>Add a Dog Gif to Webpage</h1>
      <img src={dogSrc} />
      <button onClick={generateDogGif}>Generate Dog Gif</button>

      <div className="grid grid-cols-2 gap-4 p-8">
        <ToneCard colorClass="tone-card-purple" text="Happy" />
        <ToneCard colorClass="tone-card-orange" text="Sad" />
        <ToneCard colorClass="tone-card-pink" text="Flirt" />
        <ToneCard colorClass="tone-card-blue" text="Doggie" />
        <ToneCard colorClass="tone-card-yellow" text="Formal" />
        <ToneCard colorClass="tone-card-green" text="Man" />
      </div>
    </main>
  );
};

export default App;
