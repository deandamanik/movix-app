import { useToastStore } from '../store/useToastStore';
import { AlertCircle, X } from 'lucide-react';
import { motion, AnimatePresence} from 'framer-motion';

const GlobalToast = () => {
  const { message, hideToast } = useToastStore();

  return (
    <AnimatePresence>
      {message && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-9999 px-6 w-full flex justify-center pointer-events-none">
          <motion.div
            className="pointer-events-auto bg-white p-4 rounded-xl border border-brand-muted flex items-center gap-4 shadow-lg"
            initial={{ opacity: 0, y: -80, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
          >
            <div className="flex items-center gap-3">
              <div className="bg-brand-light p-2 rounded-lg">
                <AlertCircle size={18} className="text-brand-primary" />
              </div>
              <p className="text-sm font-semibold text-text-main">
                {message}
              </p>
            </div>
            <button onClick={hideToast} className="p-1.5 hover:bg-brand-light rounded-lg">
              <X size={16} className="text-text-secondary" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default GlobalToast;