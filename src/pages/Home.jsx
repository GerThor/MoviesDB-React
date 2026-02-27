import React, { useState } from 'react'
import SearchBar from '../components/ui/SearchBar';
import HomeFigure from "../assets/watching-movie.jpg";
import { useSearchParams,useNavigate } from "react-router-dom";

const Home = () => {
    const [searchString, setSearchString] = useState("");
    const navigate = useNavigate();

    const handleFormInput = (event) => {
      setSearchString(event.target.value);
    };
  
    const handleFormSubmit = (event) => {
      event.preventDefault();
      navigate(`/movies?search=${searchString}`);
    };


  return (
    <div className="body__container">
      <div className="row row__home">
        <div className="home__body--header">
          <h2 className="search__bar--header">Search For Movies</h2>
          <SearchBar searchString={searchString} handleFormInput={handleFormInput} handleFormSubmit={handleFormSubmit} />
        </div>
        <div className="home__body__figure">
          <img src={HomeFigure} alt="" />
        </div>
      </div>
    </div>
  )
}


export default Home;
