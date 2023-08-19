import React, { useState } from "react";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

const nbaTeamAbbreviations = [
  "ATL",
  "BOS",
  "BKN",
  "CHA",
  "CHI",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GSW",
  "HOU",
  "IND",
  "LAC",
  "LAL",
  "MEM",
  "MIA",
  "MIL",
  "MIN",
  "NOP",
  "NYK",
  "OKC",
  "ORL",
  "PHI",
  "PHX",
  "POR",
  "SAC",
  "SAS",
  "TOR",
  "UTA",
  "WAS",
];

const teamGradients = {
  bulls: ["#D40026", "#FF3038", "#C00020", "#900014"],
  lakers: ["#552583", "#702F8A", "#FDB927", "#FFC72C"],
  heat: ["#98002E", "#B40026", "#500014", "#000000"],

  hawks: ["#E03A3E", "#C1D32F", "#26282A", "#BAC3C9"],
  knicks: ["#006BB6", "#0074C7", "#F15C26", "#F58426"],
  spurs: ["#C4CED3", "#D1D5D8", "#95989A", "#000000"],
  celtics: ["#007A33", "#BA9653", "#FFFFFF", "#000000"],
  nets: ["#000000", "#FFFFFF", "#C4CED3", "#707070"],
  raptors: ["#CE1141", "#D61A46", "#000000", "#A09A9B"],
  hornets: ["#1D1160", "#00788C", "#A1A1A4", "#7D7D78"],
  cavaliers: ["#6F263D", "#862633", "#FFB81C", "#041E42"],
  mavericks: ["#0053BC", "#00285E", "#BBC4CA", "#8D9093"],
  nuggets: ["#0E2240", "#1D428A", "#FEC524", "#8DB8E2"],
  warriors: ["#003DA5", "#0051BA", "#FFC72D", "#FFD54F"],
  rockets: ["#D40026", "#E5002B", "#C4CED3", "#FFFFFF"],
  clippers: ["#0055B1", "#0065D1", "#C60C30", "#FFFFFF"],
  // ... Add other teams here ...
};

const NBASelector = () => {
  const [selectedTeam, setSelectedTeam] = useState("bulls");

  const handleTeamChange = (event) => {
    setSelectedTeam(event.target.value);
    const gradient = teamGradients[event.target.value];
    document.body.style.background = `linear-gradient(to right, ${gradient[0]}, ${gradient[1]}, ${gradient[2]}, ${gradient[3]})`;
  };

  return (
    <select
      id="underline_select"
      value={selectedTeam}
      onChange={handleTeamChange}
    >
      {Object.keys(teamGradients).map((team) => (
        <option key={team} value={team}>
          {team.charAt(0).toUpperCase() + team.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default NBASelector;
