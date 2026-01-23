import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="group cursor-pointer">
      <div className="aspect-2/3 overflow-hidden rounded-movix bg-brand-light mb-3 relative shadow-md">
        <img 
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://via.placeholder.com/500x750?text=No+Image'} 
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="font-medium text-sm line-clamp-1 group-hover:text-brand-primary transition-colors">
        {movie.title}
      </h3>
      <p className="text-xs text-text-secondary mt-1">
        {movie.release_date?.split('-')[0] || 'N/A'}
      </p>
    </Link>
  );
};

export default MovieCard;