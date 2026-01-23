import { useEffect, useState, useCallback } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getTrendingMovies, searchMovies } from '../api/movieService';
import MovieSkeleton from '../components/MovieSkeleton';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [timeWindow, setTimeWindow] = useState('day');

  const loadTrendingData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTrendingMovies(timeWindow);
      setMovies(data);
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
    } finally {
      setLoading(false);
    }
  }, [timeWindow]);

  useEffect(() => {
    if (!query) {
      loadTrendingData();
    }
  }, [loadTrendingData, query]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      setLoading(true);
      try {
        const results = await searchMovies(value);
        setMovies(results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="py-12 px-6">
      {/* Search Header */}
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">
          Find your next favorite movie<span className="text-brand-primary">.</span>
        </h1>
        
        <div className="relative group">
          <SearchIcon 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-primary transition-colors" 
            size={20} 
          />
          <input 
            type="text"
            value={query}
            onChange={handleSearch} 
            placeholder="Search for movies..."
            className="w-full h-14 pl-12 pr-6 rounded-movix bg-surface border border-brand-muted/30 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 shadow-soft transition-all"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-6 mb-8">
          <h2 className="text-2xl font-bold text-text-main">
            {query ? `Results for "${query}"` : "Trending"}
          </h2>
          
          {!query && (
            <div className="flex border-2 border-brand-primary rounded-full p-0.5 bg-white">
              <button 
                onClick={() => setTimeWindow('day')}
                className={`px-6 py-1 rounded-full text-xs font-bold transition-all ${
                  timeWindow === 'day' ? 'bg-brand-primary text-white' : 'text-brand-primary hover:bg-brand-primary/10'
                }`}
              >
                Today
              </button>
              <button 
                onClick={() => setTimeWindow('week')}
                className={`px-6 py-1 rounded-full text-xs font-bold transition-all ${
                  timeWindow === 'week' ? 'bg-brand-primary text-white' : 'text-brand-primary hover:bg-brand-primary/10'
                }`}
              >
                This Week
              </button>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {loading ? (
            [...Array(10)].map((_, i) => <MovieSkeleton key={i} />)
          ) : movies.length > 0 ? (
            movies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`} className="group cursor-pointer">
                <div className="aspect-2/3 overflow-hidden rounded-movix bg-brand-light mb-3 relative shadow-md">
                  <img 
                    src={movie.poster_path 
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                      : 'https://via.placeholder.com/500x750?text=No+Image'} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-medium text-sm line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {movie.title}
                </h3>
                <p className="text-xs text-text-secondary mt-1">
                  {movie.release_date?.split('-')[0] || 'N/A'}
                </p>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-text-secondary">
              No movies found for "{query}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;