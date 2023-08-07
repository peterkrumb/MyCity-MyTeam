import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

import "./index.css";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [dropdownData, setDropdownData] = useState([]);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [options, setOptions] = useState([]);
  const [playerStats, setPlayerStats] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    console.log("Input:", event.target.value);
  };

  const handleInputFocus = () => {
    if (input.length >= 3) {
      setMenuIsOpen(true);
    }
  };

  const handleButtonClick = () => {
    //take the value of Select and send it to the backend
    const playerID = selectedOption.value;
    //we are going to take only the first name of the name value
    const playerFirst = selectedOption.label.split(" ")[0];
    //we are going to take only the last name of the name value
    const playerLast = selectedOption.label.split(" ")[1];

    axios
      .get(
        `https://mycity-myteam-50c9ae9b3d0d.herokuapp.com/api/generate?playerID=${playerID}&playerFirst=${playerFirst}&playerLast=${playerLast}&search=`,
        {
          playerID: playerID,
          playerFirst: playerFirst,
          playerLast: playerLast,
        }
      )
      .then((res) => {
        console.log(res.data);
        setPlayerStats(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(selectedOption);
    console.log(playerFirst);
  };

  useEffect(() => {
    if (input.length >= 3) {
      console.log(`Sending request with search: ${input}`);
      // Trigger API call
      axios
        .get(
          "https://mycity-myteam-50c9ae9b3d0d.herokuapp.com/endpoint?search=" +
            input
        )
        .then((response) => {
          console.log(response.data.data);
          setDropdownData(response.data.data);
          const sortedOptions = response.data.data
            .map((player) => ({
              value: player.id,
              label: `${player.first_name} ${player.last_name}`,
            }))
            .sort((a, b) => {
              const lastNameA = a.label.split(" ").pop().toLowerCase();
              const lastNameB = b.label.split(" ").pop().toLowerCase();
              return lastNameA.localeCompare(lastNameB);
            });
          setOptions(sortedOptions);
          setMenuIsOpen(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setMenuIsOpen(false); // Close the dropdown when input length is less than 3
    }
  }, [input]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  return (
    <main className="flex flex-col min-h-screen pt-30 bg-white text-center px-0">
      <h1 className="text-4xl ">My City</h1>
      <br />
      <h1 className="text-4xl  ">My Team</h1>
      <div className="w-full max-w-lg mx-auto mt-10 ">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search for a player:
        </label>
        <div>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={input}
            onChange={handleInputChange}
          />
          {dropdownData.length > 0 && (
            <Select
              options={options}
              isSearchable={false}
              menuIsOpen={menuIsOpen}
              onMenuClose={() => setMenuIsOpen(false)}
              onChange={handleSelectChange}
              onFocus={handleInputFocus}
              value={selectedOption}
            />
          )}
          <button onClick={handleButtonClick}>Submit</button>
          {playerStats && (
            <div className="player-stats">
              <h2>Player Statistics</h2>
              {Object.entries(playerStats).map(([key, value]) => (
                <div key={key} className="stat-item">
                  <strong>{key}</strong>: {value}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
