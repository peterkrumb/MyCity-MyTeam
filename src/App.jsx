import { useState } from "react";

import "./index.css";
import "./App.css";

function App() {
  return (
    <main className=" p-7 shrink-0">
      <h1 className="text-3xl font-bold " >My City My Team</h1>
      <div class="w-full max-w-xs mx-auto">
        <label for="search" class="block text-gray-700 text-sm font-bold mb-2">
          Search for a player:
        </label>
        <div class="flex items-center border-b border-teal-500 py-2">
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Enter player name..."
          />
        </div>
      </div>
    </main>
  );
}

export default App;
