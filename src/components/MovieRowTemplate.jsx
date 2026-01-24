import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';

function MovieRowTemplate({ title, movies, loading, children, animationKey }) {
  return (
    <section className="max-w-6xl mx-auto mb-12 mt-8">
      <div className="flex items-center gap-6 mb-6 px-6 md:px-0">
        <h2 className="text-2xl font-bold">{title}</h2>
        {children}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={animationKey || title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex overflow-x-auto gap-6 pb-6 px-6 md:px-0 scrollbar-hide"
        >
          {loading ? (
            [...Array(10)].map((_, i) => (
              <div key={i} className="min-w-37.5 md:min-w-45">
                <MovieSkeleton />
              </div>
            ))
          ) : (
            movies?.map((movie) => (
              <div key={movie.id} className="min-w-37.5 md:min-w-45">
                <MovieCard movie={movie} />
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

export default MovieRowTemplate;