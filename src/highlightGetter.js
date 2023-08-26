import React from "react";
import axios from "axios";

const highlightGetter = (selectedPlayer) => {
  axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        maxResults: 5,
        type: "video",
        key: "AIzaSyBO0w765D4fGyoG7XUnwXT77br-nxcNMs8", // Replace this with your actual YouTube API key
        q: selectedPlayer + " nba basketball highlights",
      },
    })
    .then(function (response) {
      const vidID = response.data.items[0].id.videoId;
      const videoSrc = "https://www.youtube.com/embed/" + vidID;
      document.querySelector("iframe").setAttribute("src", videoSrc);
    });
};
export default highlightGetter;
