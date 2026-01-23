import { Link, useLocation } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useWatchlistStore } from '../store/useWatchlistStore';

const Navbar = () => {
  const location = useLocation();
  const { watchlist } = useWatchlistStore();
  
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
          MOVIX<span className="text-brand-primary">.</span>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/watchlist" 
            className={`group relative flex items-center gap-2 text-sm font-semibold transition-colors ${
              isActive('/watchlist') 
              ? 'text-brand-primary' 
              : 'text-text-secondary hover:text-brand-primary'
            }`}
          >
            <div className="relative">
              <Heart 
                size={20} 
                fill={isActive('/watchlist') ? "currentColor" : "none"} 
              />
              {watchlist.length > 0 && (
                <span className="absolute -top-2 -right-2.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand-primary px-1 text-[10px] font-bold text-white ring-2 ring-white">
                  {watchlist.length}
                </span>
              )}
            </div>
            <span>Watchlist</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;