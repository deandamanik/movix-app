import { useWatchlistStore } from '../store/useWatchlistStore';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const WatchlistToast = () => {
  const { errorMessage, clearError } = useWatchlistStore();

  return (
    <AnimatePresence>
      {errorMessage && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 px-6 w-full flex justify-center pointer-events-none">
          <motion.div
            className="pointer-events-auto bg-white p-4 rounded-xl border border-brand-muted flex items-center gap-4"
            initial={{ opacity: 0, y: -80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            style={{ 
              width: "max-content", 
              maxWidth: "90vw",
              boxShadow: "0 10px 25px -4px rgba(56, 189, 248, 0.15)" 
            }} 
          >
            <div className="flex items-center gap-3">
              <div className="bg-brand-light p-2 rounded-lg">
                <AlertCircle size={18} className="text-brand-primary" />
              </div>
              
              <p className="text-sm font-semibold text-text-main tracking-tight whitespace-nowrap">
                {errorMessage}
              </p>
            </div>
            
            <div className="w-px h-6 bg-brand-muted ml-2" />

            <button 
              onClick={clearError} 
              className="p-1.5 hover:bg-brand-light rounded-lg transition-colors group"
            >
              <X size={16} className="text-text-secondary group-hover:text-brand-dark" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default WatchlistToast;