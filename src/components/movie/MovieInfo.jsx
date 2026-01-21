import { Star, Clock, Calendar, PlayCircle, Plus } from 'lucide-react';

const MovieInfo = ({ movie }) => {
  return (
    <div className="flex-1 text-text-main">
      <div className="flex flex-wrap gap-2 mb-4">
        {movie.genres.map((g) => (
          <span key={g.id} className="text-[10px] font-bold uppercase tracking-widest bg-brand-primary text-white px-3 py-1 rounded-md">
            {g.name}
          </span>
        ))}
      </div>

      <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
        {movie.title}
      </h1>

      <div className="flex flex-wrap gap-6 items-center mb-8 font-bold text-sm">
        <div className="flex items-center gap-2 text-yellow-400 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-sm border border-white/50">
          <Star size={18} fill="currentColor" />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-md px-3 py-2 rounded-lg border border-white/50 shadow-sm">
          <Clock size={18} />
          <span>{movie.runtime} min</span>
        </div>
        <div className="flex items-center gap-2 text-white bg-black/30 backdrop-blur-md px-3 py-2 rounded-lg border border-white/50 shadow-sm">
          <Calendar size={18} />
          <span>{movie.release_date.split('-')[0]}</span>
        </div>
      </div>

      <p className="text-l text-black leading-relaxed mb-8 italic">
        "{movie.tagline || 'No tagline available'}"
      </p>

      <div className="flex flex-wrap gap-4 mb-10">
        <button className="flex items-center gap-3 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-xl shadow-brand-primary/30">
          <PlayCircle size={22} /> Watch Trailer
        </button>
        <button className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-brand-muted/30 text-text-main rounded-2xl font-bold hover:border-brand-primary hover:text-brand-primary transition-all">
          <Plus size={22} /> Add to Watchlist
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold">Storyline</h3>
        <p className="text-lg text-text-secondary leading-relaxed">{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieInfo;