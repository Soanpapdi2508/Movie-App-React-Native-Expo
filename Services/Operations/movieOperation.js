import { TMDB_CONFIG } from "../api";
import { apiConnector } from "../apiConnector";
import { RECOMMENDATION } from "../api";

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
      throw new Error();
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
    const searchData = {
      searchQuery: searchQuery,
      title: title,
      poster_path: poster_path,
      movie_id: id,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    // Debug environment variables
    console.log("🔍 DEBUG INFO:");
    console.log(
      "BACKEND_BASE_URL from env:",
      process.env.EXPO_PUBLIC_BACKEND_BASE_URL
    );
    console.log("Full URL being called:", ADD_RECOMMENDATION);
    console.log("Request data:", searchData);
    console.log("Headers:", headers);

    const response = await apiConnector(
      "POST",
      ADD_RECOMMENDATION,
      searchData,
      headers
    );
    console.log("✅ SUCCESS - Response received:", response);

    if (!response?.data?.success) {
      throw new Error("Backend returned unsuccessful response");
    }

    return response.data;
  } catch (error) {
    console.log("❌ ERROR while Adding Recommendation:", error.message);

    // More detailed error logging
    if (error.response) {
      console.log("📋 Response error details:");
      console.log("  Status:", error.response.status);
      console.log("  Data:", error.response.data);
      console.log("  Headers:", error.response.headers);
    } else if (error.request) {
      console.log("🌐 Network error - no response received");
      console.log("  Request config:", {
        method: error.config?.method,
        url: error.config?.url,
        timeout: error.config?.timeout,
      });
    } else {
      console.log("⚙️ Request setup error:", error.message);
    }

    throw error; // Re-throw to handle in calling code
  }
};
