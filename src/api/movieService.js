import tmdbClient from './tmdbConfig';

export const getTrendingMovies = async () => {
  try {
    const response = await tmdbClient.get('/trending/movie/day');
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