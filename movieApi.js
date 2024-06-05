import axios from 'axios';

const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: { api_key: API_KEY, query, page },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieCast = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/credits`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchMovieTrailer = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}/videos`, {
      params: { api_key: API_KEY },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
