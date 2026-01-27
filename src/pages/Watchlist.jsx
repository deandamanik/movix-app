  import { useEffect } from 'react'; 
  import { useWatchlistStore } from '../store/useWatchlistStore';
  import { Link, useNavigate } from 'react-router-dom'; 
  import { ArrowLeft, Film, Plus } from 'lucide-react'; 
  import { motion } from 'framer-motion'; 
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

          <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-text-main mb-2">
                My Watchlist<span className="text-brand-primary">.</span>
              </h1>
              <p className="text-text-secondary">You have saved {watchlist.length} movies.</p>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Storage</span>
                <div className="h-2 w-24 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${watchlist.length >= 5 ? 'bg-red-500' : 'bg-brand-primary'}`}
                    style={{ width: `${(watchlist.length / 5) * 100}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-text-main">{watchlist.length}/5</span>
            </div>
          </header>

          {watchlist.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-brand-primary/10 blur-3xl rounded-full" />
                <div className="relative bg-white border border-brand-muted p-6 rounded-3xl shadow-soft">
                  <Film size={48} className="text-brand-muted" />
                </div>
              </div>

              <h3 className="text-xl font-bold text-text-main mb-2">Your watchlist is empty</h3>
              <p className="text-text-secondary max-w-xs mb-8">
                Looks like you haven't discovered any cinematic gems yet. Let's find some!
              </p>

              <Link 
                to="/" 
                className="flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-dark transition-all shadow-hover-blue active:scale-95"
              >
                <Plus size={18} />
                Browse Movies
              </Link>
            </motion.div>
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