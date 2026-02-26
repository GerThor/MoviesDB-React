import React, { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import Movie from "../components/ui/Movie";
import axios from "axios";


// possibly implement keeping page state on page refresh and when going from dynamic route back to movie page 
// test useStates and go through logic of the useStates to ensure everything is being set properly to your intended features


const Movies = () => {
  const [movieArray, setMovieArray] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [formSubmit, setFormSubmit] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberToggle, setPageNumberToggle] = useState(false);
  const [pageMovieRender, setPageMovieRender] = useState(false);
  const [totalMovies, setTotalMovies] = useState("");
  const [totalMoviePages, setTotalMoviePages] = useState(0)

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmit(true);
    setPageNumber(1)
    console.log("input value:", searchString);
  };

  const handleFormInput = (event) => {
    setSearchString(event.target.value);
  };

  const handlePageLeftArrow = () => {
    if (pageNumber !== 1) {
      setPageNumber(pageNumber - 1);
      setPageNumberToggle(true);
    }
  };

  const handlePageRightArrow = () => {
    if (pageNumber < totalMoviePages) {
      setPageNumber(pageNumber + 1);
      setPageNumberToggle(true);
    }
  };

  function calculateMoviePages (totalMovies) {
    let numberOfMovies = totalMovies;
    let countPages = 0;
    while (numberOfMovies > 10) {
      numberOfMovies -= 10;
      countPages += 1;
    }
    if (numberOfMovies > 0) {
      setTotalMoviePages(countPages + 1)
    } else {
      setTotalMoviePages(countPages)
    }
  }

  async function fetchMovieAPI() {
    // maybe perform a loop to get all pages with one function call and 50+ API calls, clean dataset, then use new dataset
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=df6f10c4&s=${searchString}&page=${pageNumber}`,
    );
    // sift through and remove duplicate ID's here? // Create a new cleaner dataset
    const uniqueMovies = data.Search.filter(
      (movie, index, self) =>
        index === self.findIndex(m => m.imdbID === movie.imdbID)
    );
    console.log("initial dataset: ", data);
    console.log("filtered dataset: ", uniqueMovies);
    // setMovieArray(data.Search);
    setMovieArray(uniqueMovies);
    setTotalMovies(Number(data.totalResults))
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
    if (totalMovies > 0 && pageMovieRender) {
      calculateMoviePages(totalMovies);
      console.log("totalmovies UseState:", totalMovies)
    }


  }, [formSubmit, pageNumberToggle, totalMovies, totalMoviePages]);

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
                className="btn btn__arrows"
                onClick={() => handlePageLeftArrow()}
              >
                &#8592;
              </button>
              <h4>Page {pageNumber} of {totalMoviePages} </h4>
              <button
                className="btn btn__arrows"
                onClick={() => handlePageRightArrow()}
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
