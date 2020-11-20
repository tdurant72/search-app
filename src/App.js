import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Movie from "./components/Movie";
import Search from "./components/Search";

const MOVIE_API_URL = "http://www.omdbapi.com/?s='batman'&apikey=1ccadbde";
const App = () => {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse);
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  }, []);
  const search = (searchValue) => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`http://www.omdbapi.com/?s=${searchValue}&apikey=1ccadbde`)
      .then((response) => response.json())
      .then((jsonResponse) => {
        setMovies(jsonResponse);
        if (jsonResponse.Response === "True") {
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };
  return (
    <div className="App">
      <Header text="Movie search" />
      <Search search={search} />
      <p className="App-intro">Sharing a few moview</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
