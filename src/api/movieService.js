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