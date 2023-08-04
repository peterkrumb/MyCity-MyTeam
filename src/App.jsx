import { useState, useEffect } from "react";
import axios from "axios";

import "./index.css";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [dropdownData, setDropdownData] = useState([]);

  // handleInputChange(input);

  useEffect(() => {
    if (input.length > 2) {
      console.log(`Sending request with search: ${input}`);
      // Trigger API call
      axios
        .get("http://localhost:8000/api/endpoint?search=" + input)
        .then((response) => {
          console.log(response.data);
          setDropdownData(response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [input]); // This effect runs whenever inputValue changes

  return (
    <main className="flex flex-col   min-h-screen pt-30 bg-white text-center px-0">
      <h1 className="text-4xl ">My City</h1>
      <br />
      <h1 className="text-4xl  ">My Team</h1>
      <div className="w-full max-w-xs mx-auto mt-10 text-center">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search for a player:
        </label>
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700  py-1 px-2 leading-tight focus:outline-none"
            id="search"
            type="text"
            placeholder="Enter player name..."
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              console.log(e.target.value);
            }}
          />
          {/* <select>
            {dropdownData.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </main>
  );
};

export default App;
