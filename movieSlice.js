import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMovies, fetchMovieDetails, fetchMovieCast, fetchMovieTrailer } from '../api/movieApi';

export const searchMovies = createAsyncThunk('movies/searchMovies', async ({ query, page }) => {
  const response = await fetchMovies(query, page);
  return response.results;
});

export const getMovieDetails = createAsyncThunk('movies/getMovieDetails', async (id) => {
  const [details, cast, trailer] = await Promise.all([
    fetchMovieDetails(id),
    fetchMovieCast(id),
    fetchMovieTrailer(id),
  ]);
  return { details, cast, trailer: trailer.results };
});

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    movieDetails: null,
    movieCast: [],
    movieTrailer: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchMovies.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload;
      })
      .addCase(searchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getMovieDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetails = action.payload.details;
        state.movieCast = action.payload.cast;
        state.movieTrailer = action.payload.trailer;
      })
      .addCase(getMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default movieSlice.reducer;
