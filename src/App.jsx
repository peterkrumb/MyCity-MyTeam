import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "./index.css";
import logo from "./assets/logo.png";
import NBASelector from "./teamSelector";

const App = () => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [season, setSeason] = useState(2020);

  const debounceTimeout = useRef(null);

  const statMapping = {
    games_played: "Games Played",
    season: "Season",
    min: "Minutes",
    fgm: "FGM",
    fga: "FGA",
    fg3m: "3PM",
    fg3a: "3PA",
    ftm: "FTM",
    fta: "FTA",
    oreb: "Off Rebounds",
    dreb: "Def Rebounds",
    reb: "Total Rebounds",
    ast: "Assists",
    stl: "Steals",
    blk: "Blocks",
    turnover: "Turnovers",
    pf: "Personal Fouls",
    pts: "Points",
    fg_pct: "FG %",
    fg3_pct: "3P %",
    ft_pct: "FT %",
  };

  useEffect(() => {
    if (input.length >= 3) {
      axios
        .get(
          "https://mycity-myteam-50c9ae9b3d0d.herokuapp.com/api/endpoint?search=" +
            input
        )
        .then((response) => {
          const sortedOptions = response.data.data
            .map((player) => ({
              value: player.id,
              label: `${player.first_name} ${player.last_name}`,
            }))
            .sort((a, b) => a.label.localeCompare(b.label));

          setOptions(sortedOptions);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setOptions([]);
    }
  }, [input]);

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
  };

  const handleSubmit = () => {
    if (!selectedOption) {
      console.log("No player selected.");
      return;
    }

    const playerID = selectedOption.value;
    const [playerFirst, playerLast] = selectedOption.label.split(" ");

    const url = `https://mycity-myteam-50c9ae9b3d0d.herokuapp.com/api/generate?playerID=${playerID}&playerFirst=${playerFirst}&playerLast=${playerLast}&season=${season}`;
    console.log("Calling URL:", url);
    axios
      .get(url)
      .then((res) => {
        setPlayerStats(res.data.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <main className="flex flex-col min-h-screen pt-30 text-center px-0">
      <img src={logo} alt="" />
      <br />
      <br />
      <div max-w-sm>
        <NBASelector />
      </div>
      <div className="w-full max-w-lg mx-auto mt-10">
        <label>Select a season:</label>
        <select value={season} onChange={(e) => setSeason(e.target.value)}>
          {[...Array(new Date().getFullYear() - 1946 + 1)].map((_, index) => (
            <option value={1946 + index} key={1946 + index}>
              {1946 + index}
            </option>
          ))}
        </select>
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Search for a player:
        </label>
        <Select
          options={options}
          isSearchable={true}
          onChange={handleSelectChange}
          onInputChange={(value) => setInput(value)}
          value={selectedOption}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 max-w-xs"
          onClick={handleSubmit}
        >
          Fetch Stats
        </button>
      </div>
      <br />
      <div className="container mx-auto">
        {playerStats && (
          <div className="player-stats container mx-auto flex flex-wrap py-4 max-w-4xl">
            {Object.entries(playerStats).map(([key, value]) => (
              <div
                key={key}
                className="stat-item w-full sm:w-40 h-24 bg-gray-800 text-white rounded-lg m-4 transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
              >
                <div>
                  <strong className="text-sm block text-center truncate">
                    {statMapping[key] || key}
                  </strong>
                  <span className="text-lg font-semibold block text-center mt-1 truncate">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default App;
