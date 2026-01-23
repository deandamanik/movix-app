import { useState } from 'react';
import { Play } from 'lucide-react';
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
    <section 
      className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] py-8 transition-all duration-700 ease-in-out bg-cover bg-center"
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 0.9) 0%, rgba(3, 37, 65, 0.2) 100%), url(https://image.tmdb.org/t/p/w1280${activeBg})`,
        backgroundBlendMode: 'overlay',
        backgroundColor: '#053b67'
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-xl font-bold text-white mb-6">Latest Trailers</h2>

        <div className="flex overflow-x-auto gap-5 pb-6 scrollbar-hide">
          {movies.slice(0, 10).map((movie) => (
            <div 
              key={movie.id}
              onMouseEnter={() => setActiveBg(movie.backdrop_path)}
              onClick={() => handlePlayTrailer(movie.id)}
              className="min-w-70 group cursor-pointer"
            >
              <div className="relative aspect-video overflow-hidden rounded-xl mb-3 shadow-lg">
                <img 
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} 
                  alt={movie.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all">
                  <Play fill="white" className="text-white scale-100 group-hover:scale-125 transition-transform" size={40} />
                </div>
              </div>
              
              <h3 className="text-white font-semibold text-sm text-center line-clamp-1 group-hover:text-brand-primary transition-colors">
                {movie.title}
              </h3>
              
              <p className="text-white/60 text-xs text-center mt-1">
                Official Trailer
              </p>
            </div>
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