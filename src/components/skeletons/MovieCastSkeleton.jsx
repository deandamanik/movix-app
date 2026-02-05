const MovieCastSkeleton = () => {
  return (
    <div className="w-full relative animate-pulse">
      <div className="w-48 h-8 bg-slate-200 rounded-md mb-8" />
      <div className="relative">
        <div className="flex gap-6 overflow-hidden pb-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-36 shrink-0">
              <div className="w-36 h-48 rounded-2xl bg-slate-200 mb-3 border border-slate-100" />
              <div className="w-28 h-4 bg-slate-200 rounded-md mb-2" />
              <div className="w-20 h-3 bg-slate-100 rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCastSkeleton;