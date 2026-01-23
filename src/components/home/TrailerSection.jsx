import { useState } from 'react';
import { Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getMovieVideos } from '../../api/movieService';
import TrailerModal from '../movie/TrailerModal';

const TrailerSection = ({ movies }) => {
  const [activeBg, setActiveBg] = useState(movies[0]?.backdrop_path);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handlePlayTrailer = async (movieId) => {
    const videoKey = await getMovieVideos(movieId);
    if (videoKey) {
      setSelectedVideo(videoKey);
    } else {
      alert("Trailer not available");
    }
  };

  return (
    <section className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-12 overflow-hidden min-h-100 flex items-center">
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeBg}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-cover bg-center transition-all"
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.9) 0%, rgba(3, 37, 65, 0.2) 100%), url(https://image.tmdb.org/t/p/w1280${activeBg})`,
              backgroundColor: '#032541'
            }}
          />
        </AnimatePresence>
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
        <h2 className="text-2xl font-bold text-white mb-8 tracking-tight">Latest Trailers</h2>

        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
          {movies.slice(0, 10).map((movie) => (
            <motion.div 
              key={movie.id}
              whileHover={{ y: -5 }}
              onMouseEnter={() => setActiveBg(movie.backdrop_path)}
              onClick={() => handlePlayTrailer(movie.id)}
              className="min-w-72 group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl mb-4 shadow-2xl border border-white/10">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all duration-300">
                  <div className="p-4 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 transform transition-transform group-hover:scale-110">
                    <Play fill="white" className="text-white" size={32} />
                  </div>
                </div>
              </div>
              
              <h3 className="text-white font-bold text-base text-center line-clamp-1 group-hover:text-brand-primary transition-colors">
                {movie.title}
              </h3>
              <p className="text-white/70 text-sm text-center mt-1 font-medium">
                Official Trailer
              </p>
            </motion.div>
          ))}
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