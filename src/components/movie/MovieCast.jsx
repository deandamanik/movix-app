import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MovieCast = ({ cast }) => {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const mainCast = cast.slice(0, 15);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 20);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    handleScroll();
  }, [cast]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth * 0.8 : clientWidth * 0.8;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative group/row">
      <h3 className="text-2xl font-black text-text-main mb-8">Top Billed Cast</h3>
      
      <div className="relative">
        <div 
          className={`absolute left-0 top-0 h-48 w-20 z-20 flex items-center justify-start pl-2 bg-linear-to-r from-white via-white/40 to-transparent pointer-events-none transition-opacity duration-300 ${
            showLeftArrow ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => scroll('left')}
            className="p-2 rounded-full bg-white shadow-soft pointer-events-auto hover:scale-110 active:scale-95 transition-all border border-slate-100"
          >
            <ChevronLeft className="text-brand-primary" size={28} />
          </button>
        </div>

        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory scroll-smooth"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
          {mainCast.map((actor) => (
            <div key={actor.id} className="w-36 shrink-0 group snap-start">
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

        <div 
          className={`absolute right-0 top-0 h-48 w-20 z-20 flex items-center justify-end pr-2 bg-linear-to-l from-white via-white/40 to-transparent pointer-events-none transition-opacity duration-300 ${
            showRightArrow ? 'opacity-0 group-hover/row:opacity-100' : 'opacity-0'
          }`}
        >
          <button
            onClick={() => scroll('right')}
            className="p-2 rounded-full bg-white shadow-soft pointer-events-auto hover:scale-110 active:scale-95 transition-all border border-slate-100"
          >
            <ChevronRight className="text-brand-primary" size={28} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCast;