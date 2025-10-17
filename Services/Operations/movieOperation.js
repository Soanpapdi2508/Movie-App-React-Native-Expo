import { RECOMMENDATION, TMDB_CONFIG } from "../api";
import { apiConnector } from "../apiConnector";

export const getMovies = async ({ query }) => {
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
      throw new Error("Error while getting all movies");
    }
    return response?.data?.results;
  } catch (error) {
    console.log("ERROR WHILE FETCHING MOVIES", error);
  }
};
const { ADD_RECOMMENDATION, GET_TRENDING_MOVIES } = RECOMMENDATION;
export const updateSearchCount = async (
  searchQuery,
  { title, poster_path, id }
) => {
  try {
    if (!searchQuery || !title || !poster_path || !id) {
      return console.log("Something is missing to send data");
    }
    const searchData = {
      searchQuery: searchQuery,
      title: title,
      poster_path: poster_path,
      movie_id: id,
    };
    const response = await apiConnector("POST", ADD_RECOMMENDATION, searchData);

    if (!response?.data?.success) {
      throw new Error("Backend returned unsuccessful response");
    }

    return response.data;
  } catch (error) {
    console.log("❌ ERROR while Adding Recommendation:", error.message);
    throw error; // Re-throw to handle in calling code
  }
};

export const getAllTrendingMovies = async () => {
  try {
    const response = await apiConnector("GET", GET_TRENDING_MOVIES);
    if (!response?.data?.success) {
      throw new Error("Error while getting movies");
    }
    return response?.data?.data;
  } catch (error) {
    console.log("Error while getting trending movies", error.message);
    throw error;
  }
};

export const getMovieDetail = async (movie_id) => {
  const endpoint = `${TMDB_CONFIG.BASE_URL}/movie/${movie_id}`;
  try {
    const response = await apiConnector(
      "GET",
      endpoint,
      null,
      TMDB_CONFIG.HEADERS
    );
    if (!response?.data) {
      throw new Error("Error while getting single movie details");
    }
    return response?.data;
  } catch (error) {
    console.log("Error while logging movie detail", error);
    throw error;
  }
};
