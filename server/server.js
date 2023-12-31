import express from "express";
import axios from "axios";
import cors from "cors";
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/endpoint", (req, res) => {
  console.log(`Received query request with search: ${req.query.search}`);
  axios
    .get(
      "https://balldontlie.io/api/v1/players?per_page=100&search=" +
        req.query.search
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});
app.get("/api/generate", (req, res) => {
  const { playerID, season } = req.query;
  console.log(
    `Received request with playerID: ${playerID} and season: ${season}`
  );
  axios
    .get(
      `https://balldontlie.io/api/v1/season_averages?season=${season}&player_ids[]=${playerID}`
    )
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.error("Error:", error);
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
