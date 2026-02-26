import React from "react";
import { Link } from "react-router-dom";

const MovieInfo = () => {
  return (
    <div>
      <Link to="/movies">
        <button className="btn ">&#8592;</button>
      </Link>
      MovieInfo
    </div>
  );
};

export default MovieInfo;
