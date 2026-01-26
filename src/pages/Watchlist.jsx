import { useEffect } from 'react'; // Tambahkan useEffect
import { useWatchlistStore } from '../store/useWatchlistStore';
import { Link, useNavigate } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react'; 
import MovieCard from '../components/MovieCard'; 

const Watchlist = () => {
  const { watchlist } = useWatchlistStore();
  const navigate = useNavigate(); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                isWatchlistPage={true} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;