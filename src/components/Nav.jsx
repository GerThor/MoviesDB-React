import React from "react";
import { Link } from "react-router-dom";
import MovieLogo from "../assets/movie_logo.jpg"
import HamburgerMenu from "./ui/HamburgerMenu";

const Nav = () => {
  return (
    <div className="nav__bar">
      <div className="nav__logo--container">
        <div className="nav__bar--logo">
          <img
            src={MovieLogo}
            width="50px"
            alt=""
          />
        </div>
        <div className="nav__bar__header">
          <h1 className="nav__header--text">MoviesDB</h1>
        </div>
      </div>
      <div className="nav__links--container">
        <ul className="nav__links">
            <Link to="/MoviesDB-React/" className="nav__link">Home</Link>
            <Link to="/movies" className="nav__link">Find Your Movie</Link>
            <Link className="nav__link nav__link--btn">Contact</Link> {/* link to go nowhere */}
        </ul>
      </div>
      <HamburgerMenu />
    </div>
  );
};

export default Nav;




