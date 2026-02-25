import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

// https://www.omdbapi.com/?apikey=df6f10c4&s=fast&page=1
// https://www.omdbapi.com/?apikey=df6f10c4&s=${inputstring}&page=${incrementpages} // implement arrow key to display new movies by calling api with incrementing pages

const SearchBar = () => {
  // const [nav, setNav] = useState("")
  const navigate = useNavigate();
  const { pathname } = useLocation();


  const handleFormSubmit = (event) => {
    event.preventDefault();
    // console.log("test")
    console.log(pathname)
    if (pathname === "/") {
      navigate("/movies")
    }
    fetchMovieAPI();
  }

  async function fetchMovieAPI () {
    const {data} = await axios.get("https://www.omdbapi.com/?apikey=df6f10c4&s=fast&page=1")
    const movieArray = data.Search;
    console.log(movieArray)
  }

  // useEffect(() => {
  //   // handleFormSubmit();
  // }, [])

  return (
    <div>
      <form id="search__bar--form" onSubmit={handleFormSubmit}>
        <input
          id="search__bar--input"
          type="text"
          name="query"
          placeholder="Search by Movie Name"
          // required
        />
        <button className="btn search__button" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
