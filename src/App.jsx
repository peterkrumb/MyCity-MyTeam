import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import "./index.css";
import logo from "./assets/logo.png";
import NBASelector from "./teamSelector";
import HighlightGetter from "./highlightGetter.js";

const App = () => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
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

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "#fff",
      borderColor: state.isFocused ? "blue" : "gray",
      boxShadow: state.isFocused ? null : null,
      "&:hover": {
        borderColor: "blue",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "blue" : null,
      "&:hover": {
        backgroundColor: "#f0f0f0",
      },
    }),
    menu: (provided) => ({
      ...provided,
      background: "#fff",
      borderRadius: "5px",
      boxShadow:
        "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
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
    setSelectedPlayer(selectedOption.label);
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
        console.log(res.data.data);
        console.log(res.data);
        //log the player name to the console

        //set the selected player to playerFirst + " " + playerLast
        setSelectedPlayer(playerFirst + " " + playerLast);
        highlightGetter();
        console.log(selectedPlayer);
      })
      .catch((err) => {
        console.log(err);
      });
    HighlightGetter(selectedPlayer);
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
          styles={customStyles}
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
            {Object.entries(playerStats)
              .filter(([key]) => key !== "player_id")
              .map(([key, value], index) => (
                <div
                  key={key}
                  className="stat-item w-full sm:w-40 h-24 text-white rounded-lg m-4 transition-transform transform hover:-translate-y-1 shadow-lg flex items-center justify-center"
                  style={{
                    backgroundColor: "#a1c4fd",
                    backgroundImage:
                      "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)",
                    boxShadow:
                      "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    borderRadius: "20px",
                  }}
                >
                  <div>
                    <strong
                      className="text-sm block text-center truncate"
                      style={{ fontFamily: "serif" }}
                    >
                      {statMapping[key] || key}
                    </strong>
                    <span
                      className="text-lg font-semibold block text-center mt-1 truncate"
                      style={{ fontFamily: "sans-serif" }}
                    >
                      {value}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="iframe-container">
        <iframe
          src=""
          width="100%"
          height="100%"
          // style="position: absolute"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen
        ></iframe>
      </div>
    </main>
  );
};

export default App;
