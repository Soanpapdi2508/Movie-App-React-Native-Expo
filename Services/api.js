const BACKEND_BASE_URL = process.env.EXPO_PUBLIC_BACKEND_BASE_URL;

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_TMBD_MOVIE_API_KEY,
  HEADERS: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_TMBD_MOVIE_API_KEY}`,
  },
};

export const RECOMMENDATION = {
  ADD_RECOMMENDATION: BACKEND_BASE_URL + "/AddRecommendations",
  GET_TRENDING_MOVIES: BACKEND_BASE_URL + "/getTrendingMovies"
};
