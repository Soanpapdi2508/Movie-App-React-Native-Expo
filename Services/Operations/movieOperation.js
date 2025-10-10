import { TMDB_CONFIG } from "../api";
import { apiConnector } from "../apiConnector";

export const getMovies = async (query) => {
  try {
    const endpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
    const response = await apiConnector(
      "GET",
      endpoint,
      null,
      TMDB_CONFIG.HEADERS
    );
    if (!response?.data) {
      throw new Error();
    }
    console.log("response of movies......", response);
    return response?.data?.results;
  } catch (error) {
    console.log("ERROR WHILE FETCHING MOVIES", error);
  }
};
