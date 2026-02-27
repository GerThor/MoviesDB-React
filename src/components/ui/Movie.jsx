import React from 'react'
import { Link } from "react-router-dom";

const Movie = ( { movie } ) => {
  // console.log(movie.imdbID)
  
  return (
    <div className='movie'>
      <Link to={`/movies/${movie.imdbID}`}>
        <img src={movie.Poster} alt="" className="movie__poster"/>
        <h3 className="movie__title--year">{movie.Title} {movie.Year} </h3>
      </Link>
    </div>
  )
}


export default Movie;