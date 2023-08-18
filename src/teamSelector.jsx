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
  bulls: ["#BB363B", "#B62A29", "#77110F", "#A80403"],
  lakers: ["#421C52", "#552583", "#FDB927", "#FFEBB2"],
  heat: ["#98002E", "#F9A01B", "#000000", "#FFFFFF"],

  hawks: ["#E03A3E", "#C1D32F", "#26282A", "#BAC3C9"],
  knicks: ["#006BB6", "#F58426", "#BEC0C2", "#000000"],
  celtics: ["#007A33", "#BA9653", "#FFFFFF", "#000000"],
  nets: ["#000000", "#FFFFFF", "#C4CED3", "#707070"],
  hornets: ["#1D1160", "#00788C", "#A1A1A4", "#7D7D78"],
  cavaliers: ["#6F263D", "#FFB81C", "#041E42", "#860038"],
  mavericks: ["#0053BC", "#00285E", "#BBC4CA", "#8D9093"],
  nuggets: ["#0E2240", "#FEC524", "#8C92AC", "#1D428A"],
  warriors: ["#1D428A", "#FFC72C", "#26282A", "#EFD19F"],
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
