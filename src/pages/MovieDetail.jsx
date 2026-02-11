import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetail, getMovieCredits, getMovieVideos } from '../api/movieService';
import { ArrowLeft } from 'lucide-react';
import { useToastStore } from '../store/useToastStore'; 
import DetailHero from '../components/movie/DetailHero';
import MovieInfo from '../components/movie/MovieInfo';
import MovieCast from '../components/movie/MovieCast';
import TrailerModal from '../components/TrailerModal';
import DetailHeroSkeleton from '../components/skeletons/DetailHeroSkeleton';
import MovieInfoSkeleton from '../components/skeletons/MovieInfoSkeleton';
import MovieCastSkeleton from '../components/skeletons/MovieCastSkeleton';
import NoPoster from '../assets/no-img.png';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const showToast = useToastStore((state) => state.showToast); 

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [detail, creditsData, video] = await Promise.all([
          getMovieDetail(id),
          getMovieCredits(id),
          getMovieVideos(id)
        ]);

        setMovie({ ...detail, credits: creditsData });
        setCast(creditsData.cast || []);
        setTrailerKey(video);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, [id]);

  if (!loading && !movie) return (
    <div className="min-h-screen flex items-center justify-center">
      Movie not found.
    </div>
  );

  return (
    <div className="relative min-h-screen bg-white">
      {loading ? (
        <DetailHeroSkeleton />
      ) : (
        <DetailHero backdropPath={movie?.backdrop_path} />
      )}
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-20"> 
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full transition-all mb-8 border border-white/50 shadow-lg"
        >
          <ArrowLeft size={20} />
          <span className="font-medium text-sm">Back</span>
        </button>

        <div className="flex flex-col md:flex-row gap-12 items-start mb-16">
          {loading ? (
            <div className="w-full md:w-80 aspect-2/3 shrink-0 bg-slate-200 animate-pulse rounded-2xl border-4 border-white shadow-lg" />
          ) : (
            <div className="w-full md:w-80 shrink-0 shadow-2xl shadow-black/40 rounded-2xl overflow-hidden border-4 border-white bg-brand-light">
              <img 
                src={movie?.poster_path 
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                  : NoPoster} 
                alt={movie?.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = NoPoster;
                }}
                className="w-full aspect-2/3 object-cover"
              />
            </div>
          )}

          {loading ? (
            <MovieInfoSkeleton />
          ) : (
            <MovieInfo 
              movie={movie} 
              onWatchTrailer={() => {
                if (!trailerKey) {
                  showToast("Trailer not available for this movie.");
                } else {
                  setIsModalOpen(true);
                }
              }} 
            />
          )}
        </div>

        <div className="border-t border-brand-muted/20 pt-12">
          {loading ? (
            <MovieCastSkeleton />
          ) : (
            <MovieCast cast={cast} />
          )}
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