import { useEffect, useState } from 'react';

const useMovieSearch = (query, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setMovies([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetchMovies (query, pageNumber)
      .then((res) => {
        setMovies((prevMovies) => {
          return [...new Set([...prevMovies, ...res.results.map((movie) => movie)])];
        });
        setHasMore(res.results.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  }, [query, pageNumber]);

  return { loading, error, movies, hasMore };
};

export default useMovieSearch;
