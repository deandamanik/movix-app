import { useEffect, useState, useCallback } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { getTrendingMovies, searchMovies } from '../api/movieService';
import TrendingSection from '../components/home/TrendingSection';

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
    if (!query) loadTrendingData();
  }, [loadTrendingData, query]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim().length > 0) {
      setLoading(true);
      const results = await searchMovies(value);
      setMovies(results);
      setLoading(false);
    }
  };

  return (
    <div className="py-12 px-6">
      <div className="max-w-2xl mx-auto mb-16 text-center">
        <h1 className="text-3xl font-bold mb-6 tracking-tight">
          Find your next favorite movie<span className="text-brand-primary">.</span>
        </h1>
        <div className="relative group">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-brand-primary transition-colors" size={20} />
          <input 
            type="text"
            value={query}
            onChange={handleSearch} 
            placeholder="Search for movies..."
            className="w-full h-14 pl-12 pr-6 rounded-movix bg-surface border border-brand-muted/30 outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 shadow-soft transition-all"
          />
        </div>
      </div>

      <div className="space-y-20">
        <TrendingSection 
          movies={movies}
          loading={loading}
          timeWindow={timeWindow}
          setTimeWindow={setTimeWindow}
          isSearching={query.length > 0}
          query={query}
        />
      </div>
    </div>
  );
};

export default Home;