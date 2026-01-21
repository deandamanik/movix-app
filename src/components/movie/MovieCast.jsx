const MovieCast = ({ cast }) => {
  const mainCast = cast.slice(0, 10);

  return (
    <div className="w-full">
      <h3 className="text-2xl font-black text-text-main mb-8">Top Billed Cast</h3>
      
      <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
        {mainCast.map((actor) => (
          <div key={actor.id} className="w-36 shrink-0 group">
            <div className="w-36 h-48 rounded-2xl overflow-hidden mb-3 shadow-md border border-brand-muted/10 bg-brand-light">
              <img 
                src={actor.profile_path 
                  ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` 
                  : 'https://via.placeholder.com/185x278?text=No+Photo'} 
                alt={actor.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <h4 className="font-bold text-sm text-text-main line-clamp-1">{actor.name}</h4>
            <p className="text-xs text-text-secondary mt-1 line-clamp-1 italic">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieCast;