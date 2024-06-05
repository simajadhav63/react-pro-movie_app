import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../store/movieSlice';
import Carousel from '../components/Carousel';
import LoadingSkeleton from '../components/LoadingSkeleton';
import ReactPlayer from 'react-player';
import ErrorBoundary from '../components/ErrorBoundary';

const MovieDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { movieDetails, movieCast, movieTrailer, loading, error } = useSelector(state => state.movies);

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!movieDetails) {
    return null;
  }

  const images = movieDetails.images.backdrops.map(image => `https://image.tmdb.org/t/p/w500/${image.file_path}`);

  return (
    <ErrorBoundary>
      <div className="movie-detail">
        <h1>{movieDetails.title}</h1>
        <Carousel images={images} />
        <p>{movieDetails.overview}</p>
        <h2>Cast</h2>
        <ul>
          {movieCast.cast.map((cast) => (
            <li key={cast.cast_id}>{cast.name} as {cast.character}</li>
          ))}
        </ul>
        <h2>Trailer</h2>
        {movieTrailer.length > 0 && (
          <ReactPlayer url={`https://www.youtube.com/watch?v=${movieTrailer[0].key}`} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default MovieDetailPage;
