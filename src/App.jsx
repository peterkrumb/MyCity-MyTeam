import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "./index.css";
import logo from "./assets/logo.png";

const App = () => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [season, setSeason] = useState(2020);

  const debounceTimeout = useRef(null);

  const statMapping = {
    games_played: "Games Played",
    player_id: "Player ID",
    season: "Season",
    min: "Minutes",
    fgm: "FGM",
    fga: "FGA",
    fg3m: "3PM",
    fg3a: "3PA",
    ftm: "FTM",
    fta: "FTA",
    oreb: "Offensive Rebounds",
    dreb: "Defensive Rebounds",
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
    const playerID = selectedOption.value;
    const [playerFirst, playerLast] = selectedOption.label.split(" ");
    axios
      .get(
        `https://mycity-myteam-50c9ae9b3d0d.herokuapp.com/api/generate?playerID=${playerID}&playerFirst=${playerFirst}&playerLast=${playerLast}&season=${season}`
      )
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
      </div>
      <div className="container mx-auto">
        {playerStats && (
          <div className="player-stats flex whitespace-nowrap py-4">
            {Object.entries(playerStats).map(([key, value]) => (
              <div
                key={key}
                className="stat-item bg-gray-200 rounded-md w-12 h-12 flex items-center justify-center m-2 overflow-hidden"
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
