import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetail } from '../api/movieService';
import { ArrowLeft } from 'lucide-react';
import DetailHero from '../components/movie/DetailHero';
import MovieInfo from '../components/movie/MovieInfo';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await getMovieDetail(id);
      setMovie(data);
      setLoading(false);
    };
    fetchDetail();
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

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="w-full md:w-80 shrink-0 shadow-2xl shadow-black/40 rounded-2xl overflow-hidden border-4 border-white">
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              alt={movie.title}
              className="w-full aspect-2/3 object-cover"
            />
          </div>

          <MovieInfo movie={movie} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;