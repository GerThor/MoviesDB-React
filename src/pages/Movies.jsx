import React, { useState, useEffect } from "react";
import SearchBar from "../components/ui/SearchBar";
import { useSearchParams, useNavigate } from "react-router-dom";
import Movie from "../components/ui/Movie";
import axios from "axios";

// possibly implement keeping page state on page refresh and when going from dynamic route back to movie page
// test useStates and go through logic of the useStates to ensure everything is being set properly to your intended features

const Movies = () => {
  const [searchParams] = useSearchParams();
  // if (searchParams !== null) {
  const search = searchParams.get("search");
  // }
  const [movieArray, setMovieArray] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumberToggle, setPageNumberToggle] = useState(false);
  const [pageMovieRender, setPageMovieRender] = useState(false);
  const [totalMovies, setTotalMovies] = useState("");
  const [totalMoviePages, setTotalMoviePages] = useState(0);
  const [formSubmit, setFormSubmit] = useState(false);
  const [searchString, setSearchString] = useState("");
  const [moviesLoading, setMoviesLoading] = useState(false);

  const navigate = useNavigate();

  const handleFormInput = (event) => {
    setSearchString(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setFormSubmit(true);
    setPageNumber(1);
    navigate(`/movies?search=${searchString}`);
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

  function calculateMoviePages(totalMovies) {
    let numberOfMovies = totalMovies;
    let countPages = 0;
    while (numberOfMovies > 10) {
      numberOfMovies -= 10;
      countPages += 1;
    }
    if (numberOfMovies > 0) {
      setTotalMoviePages(countPages + 1);
    } else {
      setTotalMoviePages(countPages);
    }
  }

  async function fetchMovieAPI() {
    const { data } = await axios.get(
      `https://www.omdbapi.com/?apikey=df6f10c4&s=${search}&page=${pageNumber}`,
    );
    // sift through and remove duplicate ID's here, Create a new cleaner dataset
    const uniqueMovies = data.Search.filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.imdbID === movie.imdbID),
    );

    // console.log("initial dataset: ", data);
    // console.log("filtered dataset: ", uniqueMovies);
    // setMovieArray(data.Search);
    setMovieArray(uniqueMovies);
    setTotalMovies(Number(data.totalResults));
  }

  function filterMovies() {
    const sortMovies = document.getElementById("dropdown__sort--bar").value;
    const movies = Array.from(document.querySelectorAll(".movie"));
    // for(let i = 0; i < movies.length; i++) {
    //     console.log("unsorted movies", movies[i].textContent);
    // }

    movies.sort((a, b) => {
      const movieA = a.querySelector("h3").textContent.toLocaleLowerCase();
      const movieB = b.querySelector("h3").textContent.toLocaleLowerCase();

      if (sortMovies === "A_to_Z") {
        return movieA.localeCompare(movieB);
      } else if (sortMovies === "Z_to_A") {
        return movieB.localeCompare(movieA);
      }
    });

    const parent = movies[0].parentNode;
    parent.innerHTML = "";
    movies.forEach((movie) => parent.appendChild(movie));
    console.log("Filter");
  }

  useEffect(() => {
    if (search || formSubmit) {
      setMoviesLoading(true);
      fetchMovieAPI();
      setPageMovieRender(true);
      setTimeout(() => {
        setMoviesLoading(false);
      }, 300);
    }
    if (pageNumberToggle) {
      setMoviesLoading(true);
      fetchMovieAPI();
      // console.log(pageNumber);
      setPageNumberToggle(false);
      setPageMovieRender(true);
      setTimeout(() => {
        setMoviesLoading(false);
      }, 300);
    }
    if (totalMovies > 0 && pageMovieRender) {
      calculateMoviePages(totalMovies);
      // console.log("totalmovies UseState:", totalMovies)
    }
  }, [search, searchParams, pageNumberToggle, totalMovies, totalMoviePages]);

  return (
    <div className="body__container">
      <div className="row row__movie">
        <h2 className="search__bar--header">Movies</h2>
        <SearchBar
          searchString={searchString}
          handleFormInput={handleFormInput}
          handleFormSubmit={handleFormSubmit}
        />
        <div className="movie__header__container">
            <div className="movies__search--header">
              <h2>Search Results: <span className="search__results--text">{search}</span> </h2>
            </div>
            <select id="dropdown__sort--bar" onChange={() => filterMovies()}>
              <option value disabled selected>
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
              <h4>
                Page {pageNumber} of {totalMoviePages}{" "}
              </h4>
              <button
                className="btn btn__arrows"
                onClick={() => handlePageRightArrow()}
              >
                &#8594;
              </button>
            </>
          ) : null}
        </div>{" "}
        {/* skeleton loading state very much needed, make it a dynamic sized array width 300px, height 400px */}
        <div className="movie__container--list loading__movie-list">
          {moviesLoading
            ? new Array(10).fill(0).map((_, index) => (
                <div className="movie" key={index}>
                  <div className="movie__poster--skeleton"></div>
                </div>
              ))
            : movieArray.map((movie) => (
                <Movie movie={movie} key={movie.imdbID} />
              ))}
          {/* {movieArray.map((movie) => (
            <Movie movie={movie} key={movie.imdbID} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Movies;
