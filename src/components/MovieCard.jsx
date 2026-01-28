import { Link } from 'react-router-dom';
import { Heart, Star, Trash2 } from 'lucide-react'; 
import { useWatchlistStore } from '../store/useWatchlistStore';

const MovieCard = ({ movie, isWatchlistPage = false }) => {
  const { toggleWatchlist, isInWatchlist } = useWatchlistStore();
  const isFavorite = isInWatchlist(movie.id);

  const getRatingColor = (rating) => {
    if (rating >= 7.5) return 'text-green-500';
    if (rating >= 5.5) return 'text-yellow-500';
    return 'text-red-500';
  };

  return (
    <div className="group relative">
      <Link to={`/movie/${movie.id}`} className="cursor-pointer block">
        <div className="aspect-2/3 overflow-hidden rounded-movix bg-brand-light mb-3 relative shadow-md border border-white/5">
          <img 
            src={movie.poster_path 
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
              : 'https://via.placeholder.com/500x750?text=No+Image'} 
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />

          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-md backdrop-blur-md bg-black/60 border border-white/10 text-[10px] font-bold text-white shadow-xl">
            <Star 
              size={10} 
              className={`${getRatingColor(movie.vote_average)} fill-current`} 
            />
            <span>{movie.vote_average?.toFixed(1) || '0.0'}</span>
          </div>

          <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        <div className="px-1">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-brand-primary transition-colors duration-300">
            {movie.title}
          </h3>
          <p className="text-xs text-text-secondary mt-1 font-medium">
            {movie.release_date?.split('-')[0] || 'N/A'}
          </p>
        </div>
      </Link>

      <button 
        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 shadow-2xl border border-white/10
          ${isWatchlistPage 
            ? 'bg-black/60 text-white hover:bg-red-500 opacity-0 group-hover:opacity-100' 
            : isFavorite 
              ? 'bg-brand-primary text-white scale-110 opacity-100' 
              : 'bg-black/30 text-white opacity-0 group-hover:opacity-100 hover:bg-brand-primary hover:scale-110'
          }`}
        onClick={(e) => {
          e.preventDefault();
          toggleWatchlist(movie);
        }}
      >
        {isWatchlistPage ? (
          <Trash2 size={14} />
        ) : (
          <Heart 
            size={14} 
            fill={isFavorite ? "currentColor" : "none"} 
            className={isFavorite ? "animate-pulse" : ""}
          />
        )}
      </button>
    </div>
  );
};

export default MovieCard;