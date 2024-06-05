import React, { useState, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchMovies } from '../store/movieSlice';
import MovieCard from '../components/MovieCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import useMovieSearch from '../hooks/useMovieSearch';

const HomePage = () => {
  const [query, setQuery] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const { movies, hasMore, loading, error } = useMovieSearch(query, pageNumber);

  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setPageNumber(1);
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search for movies..." />
      <div className="movie-list">
        {movies.map((movie, index) => {
          if (movies.length === index + 1) {
            return <div ref={lastMovieElementRef} key={movie.id}><MovieCard movie={movie} /></div>;
          } else {
            return <MovieCard key={movie.id} movie={movie} />;
          }
        })}
      </div>
      <div>{loading && <LoadingSkeleton />}</div>
      <div>{error && 'Error'}</div>
    </div>
  );
};

export default HomePage;
