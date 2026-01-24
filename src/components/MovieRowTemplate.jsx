import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MovieCard from './MovieCard';
import MovieSkeleton from './MovieSkeleton';

const MovieRowTemplate = ({ title, movies, loading, children, animationKey }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

  const handleScroll = () => {
    if (scrollRef.current) {
      setShowLeftArrow(scrollRef.current.scrollLeft > 20);
    }
  };
  
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-6xl mx-auto mt-12 mb-4 relative group/row">
      <div className="flex items-center gap-6 mb-6 px-6 md:px-0">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        {children}
      </div>

      <div className="relative">
        <AnimatePresence>
          {showLeftArrow && (
            <div 
              className="absolute left-0 top-0 h-56.25 md:h-67.5 w-20 z-20 flex items-center justify-start pl-2 bg-linear-to-r from-app-bg via-app-bg/40 to-transparent pointer-events-none opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
            >
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-surface shadow-soft pointer-events-auto hover:scale-110 active:scale-95 transition-all"
              >
                <ChevronLeft className="text-brand-primary" size={28} />
              </button>
            </div>
          )}
        </AnimatePresence>

        <motion.div
          ref={scrollRef}
          onScroll={handleScroll}
          key={animationKey || title}
          className="flex overflow-x-auto gap-6 pb-6 px-6 md:px-0 scrollbar-hide snap-x snap-mandatory"
        >
          {loading ? (
            [...Array(10)].map((_, i) => (
              <div key={i} className="min-w-37.5 md:min-w-45">
                <MovieSkeleton />
              </div>
            ))
          ) : (
            movies?.map((movie) => (
              <div key={movie.id} className="min-w-37.5 md:min-w-45 snap-start">
                <MovieCard movie={movie} />
              </div>
            ))
          )}
        </motion.div>

        <div 
          className="absolute right-0 top-0 h-56.25 md:h-67.5 w-20 z-20 flex items-center justify-end pr-2 bg-linear-to-l from-app-bg via-app-bg/40 to-transparent pointer-events-none opacity-0 group-hover/row:opacity-100 transition-opacity duration-300"
        >
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-surface shadow-soft pointer-events-auto hover:scale-110 active:scale-95 transition-all"
          >
            <ChevronRight className="text-brand-primary" size={28} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default MovieRowTemplate;