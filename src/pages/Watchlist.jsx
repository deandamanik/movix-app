import { useEffect } from 'react'; 
import { useWatchlistStore } from '../store/useWatchlistStore';
import { useNavigate } from 'react-router-dom'; 
import { ArrowLeft } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import MovieCard from '../components/MovieCard'; 
import WatchlistHeader from '../components/watchlist/WatchlistHeader';
import EmptyWatchlist from '../components/watchlist/EmptyWatchlist';

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

        <WatchlistHeader count={watchlist.length} />

        <AnimatePresence mode="wait">
          {watchlist.length === 0 ? (
            <EmptyWatchlist />
          ) : (
            <motion.div 
              key="watchlist-grid"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8"
            >
              {watchlist.map((movie) => (
                <motion.div key={movie.id} layout>
                  <MovieCard movie={movie} isWatchlistPage={true} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Watchlist;