import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetail, getMovieCredits, getMovieVideos } from '../api/movieService';
import { ArrowLeft } from 'lucide-react';
import DetailHero from '../components/movie/DetailHero';
import MovieInfo from '../components/movie/MovieInfo';
import MovieCast from '../components/movie/MovieCast';
import TrailerModal from '../components/movie/TrailerModal';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllData = async () => {
      const [detail, credits, video] = await Promise.all([
        getMovieDetail(id),
        getMovieCredits(id),
        getMovieVideos(id)
      ]);
      setMovie(detail);
      setCast(credits);
      setTrailerKey(video?.key); 
      setLoading(false);
    };
    fetchAllData();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-brand-primary animate-pulse font-bold">Loading...</div>;
  if (!movie) return <div className="min-h-screen flex items-center justify-center">Movie not found.</div>;

  return (
    <div className="relative min-h-screen bg-white">
      <DetailHero backdropPath={movie.backdrop_path} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-20"> 
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all mb-8 border border-white/50 shadow-lg"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back</span>
        </button>

        <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
          <div className="w-full md:w-80 shrink-0 shadow-2xl shadow-black/40 rounded-2xl overflow-hidden border-4 border-white">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="w-full aspect-2/3 object-cover"
            />
          </div>

          <MovieInfo movie={movie} onWatchTrailer={() => setIsModalOpen(true)} />
        </div>

        <div className="border-t border-brand-muted/20 pt-12">
          <MovieCast cast={cast} />
        </div>
      </div>

      {isModalOpen && (
        <TrailerModal 
          videoKey={trailerKey} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default MovieDetail;