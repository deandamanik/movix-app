import MovieCard from '../MovieCard';
import MovieSkeleton from '../MovieSkeleton';

const TrendingSection = ({ movies, loading, timeWindow, setTimeWindow, isSearching, query }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-6 mb-8">
        <h2 className="text-2xl font-bold text-text-main">
          {isSearching ? `Results for "${query}"` : "Trending"}
        </h2>
        
        {!isSearching && (
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
          movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        ) : (
          <div className="col-span-full text-center py-20 text-text-secondary">
            No movies found.
          </div>
        )}
      </div>
    </div>
  );
};

export default TrendingSection;