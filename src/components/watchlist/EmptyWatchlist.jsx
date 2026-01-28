import { Link } from 'react-router-dom';
import { Film, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const EmptyWatchlist = () => (
  <motion.div 
    key="empty-state"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.4, ease: "easeInOut" }}
    className="flex flex-col items-center justify-center py-24 text-center"
  >
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-brand-primary/10 blur-3xl rounded-full" />
      <div className="relative bg-white border border-brand-muted p-6 rounded-3xl shadow-soft text-brand-muted">
        <Film size={48} />
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
);

export default EmptyWatchlist;