import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from '../MovieCard';
import MovieSkeleton from '../MovieSkeleton';

const TrendingSection = ({ movies, loading, timeWindow, setTimeWindow, isSearching, query }) => {
  return (
    <section className="max-w-6xl mx-auto mb-12">
      <div className="flex items-center gap-6 mb-6 px-6 md:px-0">
        <h2 className="text-2xl font-bold">
          {isSearching ? `Results for "${query}"` : 'Trending'}
        </h2>
        
        {!isSearching && (
          <div className="flex bg-surface-variant/20 border border-brand-muted/30 rounded-full p-1 relative">
            {['day', 'week'].map((tab) => (
              <button
                key={tab}
                onClick={() => setTimeWindow(tab)}
                className={`relative px-6 py-1.5 rounded-full text-xs font-bold transition-colors duration-300 z-10 ${
                  timeWindow === tab ? 'text-white' : 'text-brand-primary'
                }`}
              >
                {timeWindow === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-brand-primary rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {tab === 'day' ? 'Today' : 'This Week'}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={timeWindow} 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="flex overflow-x-auto gap-6 pb-6 px-6 md:px-0 scrollbar-hide"
        >
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
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default TrendingSection;