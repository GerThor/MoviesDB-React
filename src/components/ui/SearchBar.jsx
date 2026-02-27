import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

// https://www.omdbapi.com/?apikey=df6f10c4&s=fast&page=1
// https://www.omdbapi.com/?apikey=df6f10c4&s=${inputstring}&page=${incrementpages} // implement arrow key to display new movies by calling api with incrementing pages

const SearchBar = ({ searchString, handleFormInput, handleFormSubmit }) => {
  
  return (
    <div>
      <form id="search__bar--form" onSubmit={handleFormSubmit}>
        <input
          id="search__bar--input"
          type="text"
          name="search"
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

