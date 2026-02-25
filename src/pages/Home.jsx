import React from 'react'

const Home = () => {
  return (
    <div className="home__body--container">
      <div className="row row__home">
        <div className="home__body--header">
          <h2>Search a Movie</h2>
          <form id="search__bar--form"> 
            <input id="search__bar--input" type="text" name="query" placeholder="Search by Movie Name" required/>
            <button className="search__button btn" type="submit">Search</button>
          </form>
        </div>
        <div className="home__body__figure">
          <img src="https://st2.depositphotos.com/1105977/9877/i/450/depositphotos_98775856-stock-photo-retro-film-production-accessories-still.jpg" alt="" />
        </div>
      </div>
    </div>
  )
}


export default Home;
