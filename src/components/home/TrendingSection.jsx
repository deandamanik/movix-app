import MovieCard from '../MovieCard';
import MovieSkeleton from '../MovieSkeleton';

const TrendingSection = ({ movies, loading, timeWindow, setTimeWindow, isSearching }) => {
  return (
    <section className="max-w-6xl mx-auto mb-12">
      <div className="flex items-center gap-6 mb-6 px-6 md:px-0">
        <h2 className="text-2xl font-bold">Trending</h2>
        {!isSearching && (
          <div className="flex border-2 border-brand-primary rounded-full p-0.5">
            <button 
              onClick={() => setTimeWindow('day')}
              className={`px-6 py-1 rounded-full text-xs font-bold transition-all ${
                timeWindow === 'day' ? 'bg-brand-primary text-white' : 'text-brand-primary'
              }`}
            >
              Today
            </button>
            <button 
              onClick={() => setTimeWindow('week')}
              className={`px-6 py-1 rounded-full text-xs font-bold transition-all ${
                timeWindow === 'week' ? 'bg-brand-primary text-white' : 'text-brand-primary'
              }`}
            >
              This Week
            </button>
          </div>
        )}
      </div>
      
      <div className="flex overflow-x-auto gap-6 pb-6 px-6 md:px-0 scrollbar-hide">
        {loading ? (
          [...Array(10)].map((_, i) => (
            <div key={i} className="min-w-37.5 md:min-w-45">
              <MovieSkeleton />
            </div>
          ))
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="min-w-37.5 md:min-w-45">
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TrendingSection;