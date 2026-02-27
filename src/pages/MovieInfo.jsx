import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// https://www.omdbapi.com/?apikey=df6f10c4&i=tt0175142

const MovieInfo = () => {
  const { movieId } = useParams();
  console.log(movieId)

  const [movieObject, setMovieObject] = useState({})

  async function fetchMovieInformationAPI () {
    const { data } = await axios.get(`https://www.omdbapi.com/?apikey=df6f10c4&i=${movieId}&plot=full`)
    console.log(data)
    console.log(data.Ratings[0].Value)
    setMovieObject(data)
  }


  useEffect(() => {
    fetchMovieInformationAPI();
  }, [])

  //flexbox fix css below ||||| possibly containerize better
  return (
    <div className="movie__information--container">
      <div className="back__button__container">
          <Link to="/movies">
            <button className="btn btn__arrows">&#8592;</button>
          </Link>
          <h2>Back to Movies</h2>
      </div>
      <div className="movie__information--body">
        <img src={movieObject.Poster} className="movie__poster" onerror="this.onerror=null;" alt="" />
        <div className="movie__information--text">
          <h2>{movieObject.Title}</h2>
          <p><span className="movie__plot--header">Genre:</span> {movieObject.Genre}</p>
          <p><span className="movie__plot--header">Writer(s):</span> {movieObject.Writer}</p>
          <p><span className="movie__plot--header">Actor(s):</span> {movieObject.Actors}</p>
          <p><span className="movie__plot--header">Runtime:</span> {movieObject.Runtime}</p>
          <p><span className="movie__plot--header">IMDB Rating:</span> {movieObject.imdbRating} / 10</p> {/*maybe add 1 fas fa star fontawesome icon to the left side of rating*/}
          <p className="plot__summary"><span className="movie__plot--header">Plot Summary:</span> {movieObject.Plot}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
