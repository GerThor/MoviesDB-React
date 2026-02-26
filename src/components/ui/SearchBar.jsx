import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// https://www.omdbapi.com/?apikey=df6f10c4&s=fast&page=1
// https://www.omdbapi.com/?apikey=df6f10c4&s=${inputstring}&page=${incrementpages} // implement arrow key to display new movies by calling api with incrementing pages

// const SearchBar = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const handleFormSubmit = (event) => {
//     event.preventDefault();
//     // console.log("test")
//     console.log(pathname)
//     if (pathname === "/") {
//       navigate("/movies")
//     }

//   }
//   return (
//     <div>
//       <form id="search__bar--form" onSubmit={handleFormSubmit}>
//         <input
//           id="search__bar--input"
//           type="text"
//           name="query"
//           placeholder="Search by Movie Name"
//           // required
//         />
//         <button className="btn search__button" type="submit">
//           Search
//         </button>
//       </form>
//     </div>
//   );
// };

const SearchBar = () => {
  const [searchString, setSearchString] = useState("");
  // const [formSubmit, setFormSubmit] = useState(false);
  // const [pageNumber, setPageNumber] = useState(1);
  

  const navigate = useNavigate();

  const handleFormInput = (event) => {
    setSearchString(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // setFormSubmit(true);
    // setPageNumber(1)
    navigate(`/movies?search=${searchString}`);
  };
  
  return (
    <div>
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
    </div>
  );
};

export default SearchBar;

