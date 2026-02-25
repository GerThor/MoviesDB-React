import React from "react";
import SearchBar from "../components/ui/SearchBar";
import Movie from "../components/ui/Movie";

const Movies = () => {
  return (
    <div className="body__container">
      <div className="row row__movie">
        <div>Movies</div>
        <SearchBar></SearchBar>
        <div className="movie__header__container">
          <div className="movies__search--header">
            <h2>Seach Results:</h2>
          </div>
          <select id="dropdown__sort--bar" onchange="filterMovies(event)">
            <option value disabled selected>
              Sort Alphabetically
            </option>
            <option value="A_to_Z">Alphabetically, A to Z</option>
            <option value="Z_to_A">Alphabetically, Z to A</option>
          </select>
        </div>
      </div>
      <div className="movie__container--list loading__movie-list">

      </div>
    </div>
  );
};

export default Movies;
