import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";
// we created this  file and also using this
import axios from "./axios.js";
import "./Row.css";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";
// this is an empty array or state you can set this

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState(false);
  // What does useEffect do? By using this Hook, you tell React that your component needs to do
  // something after render.React will remember the function you passed(we'll refer to it as our “effect”),
  // and call it later after performing the DOM updates.
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      // console.log(request.data.results)
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  //<<<------ here the last prams is an empty array and this is only for
  // we want our code run only single time
  //if we pass andy arg then this will update on each single time

  // console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://devlopers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          // https://www.youtube.com/watch?v=KrMdJzP6Ggo&list=RDKrMdJzP6Ggo&start_radio=1
          // this
          console.log(movie.name);
          const urlParmas = new URLSearchParams(new URL(url).search);
          console.log(urlParmas.get("v"));
          setTrailerUrl(urlParmas.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <div className="row ps-2 ms-lg-3">
      <h3 className="">{title}</h3>

      <div className="row__posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className={`row_poster ${isLargeRow && "row__posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
