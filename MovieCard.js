import React from 'react';
import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
      <div className="movie-card-body">
        <h5>{movie.title}</h5>
        <Link to={`/movie/${movie.id}`}>View Details</Link>
      </div>
    </div>
  );
};

export default MovieCard;
