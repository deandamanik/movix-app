import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-surface border-b border-brand-light/50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        <Link to="/" className="text-xl font-bold tracking-tight">
          MOVIX<span className="text-brand-primary">.</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link 
            to="/watchlist" 
            className="flex items-center gap-2 text-sm font-medium text-text-secondary hover:text-brand-primary transition-colors"
          >
            <Heart size={18} />
            <span>Watchlist</span>
          </Link>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;