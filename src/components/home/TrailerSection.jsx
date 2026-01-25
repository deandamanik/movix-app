import { useState, useRef } from 'react';
import { Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMovieVideos } from '../../api/movieService';
import TrailerModal from '../TrailerModal';
import MovieSkeleton from '../MovieSkeleton';

const TrailerSection = ({ movies, loading }) => {
  const [activeBg, setActiveBg] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const currentBg = activeBg || (movies?.length > 0 ? movies[0].backdrop_path : null);

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

  const handlePlayTrailer = async (movieId) => {
    const videoKey = await getMovieVideos(movieId);
    if (videoKey) {
      setSelectedVideo(videoKey);
    } else {
      alert("Trailer not available");
    }
  };

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-8 overflow-hidden min-h-80 flex items-center group/section">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="absolute inset-0 bg-slate-900 animate-pulse" />
          ) : (
            <motion.div
              key={currentBg || 'default'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center transition-all"
              style={{ 
                backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.9) 0%, rgba(3, 37, 65, 0.3) 100%), url(https://image.tmdb.org/t/p/w1280${currentBg})`,
                backgroundColor: '#032541'
              }}
            />
          )}
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <h2 className="text-xl font-bold text-white mb-6 tracking-tight">Latest Trailers</h2>

        <div className="relative">
          <AnimatePresence>
            {showLeftArrow && !loading && (
              <div className="absolute -left-8 top-0 bottom-20 w-12 z-20 flex items-center pointer-events-none">
                <button
                  onClick={() => scroll('left')}
                  className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white pointer-events-auto opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white/40 hover:scale-110 shadow-xl"
                >
                  <ChevronLeft size={28} />
                </button>
              </div>
            )}
          </AnimatePresence>

          <div 
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-5 pb-4 scrollbar-hide snap-x snap-mandatory"
          >
            {loading ? (
              [...Array(5)].map((_, i) => (
                <div key={i} className="min-w-64 md:min-w-72">
                  <MovieSkeleton type="trailer" />
                </div>
              ))
            ) : (
              movies?.slice(0, 10).map((movie) => (
                <motion.div 
                  key={movie.id}
                  whileHover={{ y: -3 }}
                  onMouseEnter={() => setActiveBg(movie.backdrop_path)}
                  onClick={() => handlePlayTrailer(movie.id)}
                  className="min-w-64 md:min-w-72 group cursor-pointer snap-start"
                >
                  <div className="relative aspect-video overflow-hidden rounded-lg mb-3 shadow-xl border border-white/5">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                      <div className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transition-transform group-hover:scale-105">
                        <Play fill="white" className="text-white" size={24} />
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-white font-semibold text-sm text-center line-clamp-1 group-hover:text-brand-primary transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-white/60 text-[10px] md:text-xs text-center mt-1 font-medium tracking-wide">
                    Official Trailer
                  </p>
                </motion.div>
              ))
            )}
          </div>

          {!loading && movies?.length > 0 && (
            <div className="absolute -right-8 top-0 bottom-20 w-12 z-20 flex items-center justify-end pointer-events-none">
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white pointer-events-auto opacity-0 group-hover/section:opacity-100 transition-all hover:bg-white/40 hover:scale-110 shadow-xl"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedVideo && (
        <TrailerModal 
          videoKey={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </section>
  );
};

export default TrailerSection;