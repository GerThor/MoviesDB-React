import React, { useState, useEffect, use } from "react";
import SearchBar from "../components/ui/SearchBar";
import Movie from "../components/ui/Movie";
import axios from "axios";


// possibly implement keeping page state on page refresh and when going from dynamic route back to movie page 


const Movies = () => {
  const [movieArray, setMovieArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberToggle, setPageNumberToggle] = useState(false);
  const [pageMovieRender, setPageMovieRender] = useState(false);
  // const [totalMovies, setTotalMovies] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmit(true);
    console.log("input value:", searchString);
  };

  const handleFormInput = (event) => {
    setSearchString(event.target.value);
  };

  const handlePageArrows = (value) => {
    setPageNumber(pageNumber + value);
    if (pageNumber <= 0) {
      setPageNumber(1);
    }
    setPageNumberToggle(true);
  };

  async function fetchMovieAPI() {
    // const
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=df6f10c4&s=${searchString}&page=${pageNumber}`,
    );
    // console.log(data);
    setMovieArray(data.Search);
    // setTotalMovies(data.totalResults)
    // console.log("totalmovies:", totalMovies)

  }

  useEffect(() => {
    if (formSubmit) {
      fetchMovieAPI();
      console.log("form-rerender");
      console.log(pageNumber);
      setFormSubmit(false);
      setPageMovieRender(true)
    } else if (pageNumberToggle) {
      // Test logic, might be bunch of if's instead of if-else's
      fetchMovieAPI();
      console.log(pageNumber);
      setPageNumberToggle(false);
      setPageMovieRender(true);
    }
  }, [formSubmit, pageNumberToggle]);

  return (
    <div className="body__container">
      <div className="row row__movie">
        <div>Movies</div>
        <form id="search__bar--form" onSubmit={handleFormSubmit}>
          <input
            id="search__bar--input"
            type="text"
            name="query"
            value={searchString}
            placeholder="Search by Movie Name"
            onChange={handleFormInput}
            required
          />
          <button className="btn search__button" type="submit">
            Search
          </button>
        </form>
        <div className="movie__header__container">
          <div className="movies__search--header">
            <h2>Seach Results:</h2>
          </div>
          <select id="dropdown__sort--bar">
            {" "}
            {/* onChange="filterMovies(event)" was a deleted as a parameter from select*/}
            <option value disabled>
              {" "}
              {/* selected was deleted as a parameter from option */}
              Sort Alphabetically
            </option>
            <option value="A_to_Z">Alphabetically, A to Z</option>
            <option value="Z_to_A">Alphabetically, Z to A</option>
          </select>
        </div>
        <div className="arrow__key--pages">
          {pageMovieRender ? (
            <>
              <button
                className="btn left__arrow--page-btn"
                onClick={() => handlePageArrows(-1)}
              >
                &#8592;
              </button>
              <h4>Page {pageNumber} of 95</h4>
              <button
                className="btn right__arrow--page-btn"
                onClick={() => handlePageArrows(1)}
              >
                &#8594;
              </button>
            </>
          ) : null}
        </div> {/* skeleton loading state very much needed, make it a dynamic sized array */}
        <div className="movie__container--list loading__movie-list">
          {movieArray.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
