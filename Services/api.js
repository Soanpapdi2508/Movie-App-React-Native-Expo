export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_TMBD_MOVIE_API_KEY,
  HEADERS: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_TMBD_MOVIE_API_KEY}`,
  },
};
