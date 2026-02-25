import React from 'react'
import SearchBar from '../components/ui/SearchBar';
import HomeFigure from "../assets/home_figure.jpg";

const Home = () => {
  return (
    <div className="body__container">
      <div className="row row__home">
        <div className="home__body--header">
          <h2 className="search__bar--header">Search For Movies</h2>
          <SearchBar></SearchBar>
        </div>
        <div className="home__body__figure">
          <img src={HomeFigure} alt="" />
        </div>
      </div>
    </div>
  )
}


export default Home;
