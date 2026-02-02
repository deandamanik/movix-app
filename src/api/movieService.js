import tmdbClient from './tmdbConfig';

export const getTrendingMovies = async (timeWindow = 'day') => {
  try {
    const response = await tmdbClient.get(`/trending/movie/${timeWindow}`);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await tmdbClient.get('/search/movie', {
      params: { query: query } 
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};

export const getMovieDetail = async (id) => {
  try {
    const response = await tmdbClient.get(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie detail:", error);
    return null;
  }
};

export const getMovieCredits = async (id) => {
  try {
    const response = await tmdbClient.get(`/movie/${id}/credits`);
    return response.data; 
  } catch (error) {
    console.error("Error fetching credits:", error);
    return { cast: [], crew: [] };
  }
};

export const getMovieVideos = async (id) => {
  try {
    const response = await tmdbClient.get(`/movie/${id}/videos`);
    const trailer = response.data.results.find(
      (vid) => vid.type === "Trailer" && vid.site === "YouTube"
    );
    return trailer ? trailer.key : null; 
  } catch (error) {
    console.error("Error fetching videos:", error);
    return null;
  }
};

export const getPopularMovies = async () => {
  try {
    const response = await tmdbClient.get('/movie/popular');
    return response.data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response = await tmdbClient.get('/movie/top_rated');
    return response.data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
};