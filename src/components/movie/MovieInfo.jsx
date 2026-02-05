import { motion } from 'framer-motion';
import { Star, Clock, Calendar, PlayCircle, Plus, Check } from 'lucide-react';
import { useWatchlistStore } from '../../store/useWatchlistStore';

const MovieInfo = ({ movie, onWatchTrailer }) => {
  const { toggleWatchlist, isInWatchlist } = useWatchlistStore();
  const isAdded = isInWatchlist(movie.id);

  const director = movie.credits?.crew?.find(person => person.job === 'Director');
  const writers = movie.credits?.crew?.filter(
    person => person.job === 'Writer' || person.job === 'Screenplay'
  ).slice(0, 2);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2   
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex-1 text-text-main"
    >
      <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mb-4">
        {movie.genres?.map((g) => (
          <span key={g.id} className="text-[10px] font-bold uppercase tracking-widest bg-brand-primary text-white px-3 py-1 rounded-md">
            {g.name}
          </span>
        ))}
      </motion.div>

      <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        {movie.title}
      </motion.h1>

      <motion.div variants={itemVariants} className="flex flex-wrap gap-6 items-center mb-8 font-bold text-sm">
        <div className="flex items-center gap-2 text-yellow-400 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-white/50">
          <Star size={18} fill="currentColor" />
          <span>{movie.vote_average?.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-md px-3 py-2 rounded-lg border border-white/50 shadow-sm">
          <Clock size={18} />
          <span>{movie.runtime} min</span>
        </div>
        <div className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-md px-3 py-2 rounded-lg border border-white/50 shadow-sm">
          <Calendar size={18} />
          <span>{movie.release_date?.split('-')[0]}</span>
        </div>
      </motion.div>

      <motion.p variants={itemVariants} className="text-l text-black leading-relaxed mb-8 italic">
        "{movie.tagline || 'No tagline available'}"
      </motion.p>

      {/* Buttons */}
      <motion.div variants={itemVariants} className="flex flex-wrap gap-4 mb-12">
        <button 
          onClick={onWatchTrailer} 
          className="flex items-center gap-3 px-6 py-4 bg-brand-primary text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-primary/30"
        >
          <PlayCircle size={22} /> Watch Trailer
        </button>

        <button 
          onClick={() => toggleWatchlist(movie)}
          className="flex items-center gap-3 px-6 py-4 bg-white border-2 border-brand-muted/30 text-text-main rounded-2xl font-bold hover:border-brand-primary hover:text-brand-primary active:scale-95 transition-all shadow-sm"
        >
          {isAdded ? (
            <>
              <Check size={22} className="text-brand-primary" /> 
              <span>In Watchlist</span>
            </>
          ) : (
            <>
              <Plus size={22} /> 
              <span>Add to Watchlist</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Storyline & Crew */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-sm uppercase tracking-[0.2em] font-black text-brand-primary">Storyline</h3>
          <p className="text-lg text-text-secondary leading-relaxed">{movie.overview}</p>
        </div>
        
        <div className="space-y-6">
          {director && (
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] font-black text-brand-primary mb-1">Director</h4>
              <p className="text-lg font-semibold text-text-main">{director.name}</p>
            </div>
          )}
          {writers?.length > 0 && (
            <div>
              <h4 className="text-sm uppercase tracking-[0.2em] font-black text-brand-primary mb-1">Writers</h4>
              <p className="text-lg font-semibold text-text-main">{writers.map(w => w.name).join(', ')}</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieInfo;