import { useWatchlistStore } from '../store/useWatchlistStore';
import { Link, useNavigate } from 'react-router-dom'; 
import { Trash2, ArrowLeft } from 'lucide-react'; 

const Watchlist = () => {
  const { watchlist, toggleWatchlist } = useWatchlistStore();
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen bg-white pt-12 pb-8 px-6">
      <div className="max-w-6xl mx-auto">
        
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-all mb-8 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium text-sm">Back</span>
        </button>

        <header className="mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">
            My Watchlist<span className="text-brand-primary">.</span>
          </h1>
          <p className="text-text-secondary">You have saved {watchlist.length} movies.</p>
        </header>

        {watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-text-secondary text-lg">Your watchlist is empty.</p>
            <Link to="/" className="mt-4 text-brand-primary font-semibold hover:underline">
              Browse trending movies →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {watchlist.map((movie) => (
              <div key={movie.id} className="relative group">
                <button 
                  onClick={() => toggleWatchlist(movie)}
                  className="absolute top-2 right-2 z-10 p-2 bg-black/60 hover:bg-red-500 text-white rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                  title="Remove from watchlist"
                >
                  <Trash2 size={16} />
                </button>

                <Link to={`/movie/${movie.id}`} className="block">
                  <div className="aspect-2/3 overflow-hidden rounded-movix bg-brand-light mb-3">
                    <img 
                      src={movie.poster_path 
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                        : 'https://via.placeholder.com/500x750?text=No+Image'} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-1 transition-colors">
                    {movie.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    {movie.release_date?.split('-')[0] || 'N/A'}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;